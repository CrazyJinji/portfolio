import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * מגבלות אורך. שדה בלי תקרה הוא הזמנה להצפת תיבת הדואר,
 * וגם nodemailer עצמו ייחנק על גוף מייל ענק.
 */
const LIMITS = {
  name: 120,
  email: 254, // RFC 5321
  subject: 200,
  phone: 40,
  message: 5000,
} as const;

/**
 * Rate limiting בזיכרון התהליך.
 *
 * מגבלה ידועה: על פלטפורמה serverless (Vercel וכו') המצב הזה אינו משותף בין
 * אינסטנסים ונמחק ב-cold start, ולכן זו לא הגנה הרמטית. היא כן עוצרת את
 * המקרה המעשי של בוט שמפגיז מאותה כתובת. להגנה אמיתית צריך מאגר חיצוני
 * (Upstash Redis למשל), וזה overkill לאתר פורטפוליו.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // ניקוי עצל כדי שה-Map לא יגדל בלי גבול לאורך חיי התהליך
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/**
 * הערכים נכנסים לתבנית HTML של המייל. בלי escape אפשר להזריק תגיות
 * וקישורים לתיבה שאתה קורא. זו לא XSS בדפדפן אבל זו כן הזרקה.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** ולידציה מכוונת-שפיות, לא תאימות מלאה ל-RFC. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Contact API: EMAIL_USER / EMAIL_PASS are not configured');
      return NextResponse.json({ error: 'Mailer not configured' }, { status: 500 });
    }

    const ip = clientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000) } }
      );
    }

    const body: unknown = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Malformed body' }, { status: 400 });
    }

    const raw = body as Record<string, unknown>;

    // Honeypot: שדה מוסתר שמשתמש אנושי לעולם לא ימלא.
    // מחזירים 200 בכוונה כדי שהבוט יחשוב שהצליח ולא ינסה וריאציות.
    if (asString(raw.company)) {
      console.warn(`Contact API: honeypot triggered from ${ip}`);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const name = asString(raw.name);
    const email = asString(raw.email);
    const subject = asString(raw.subject);
    const phone = asString(raw.phone);
    const message = asString(raw.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const tooLong =
      name.length > LIMITS.name ||
      email.length > LIMITS.email ||
      subject.length > LIMITS.subject ||
      phone.length > LIMITS.phone ||
      message.length > LIMITS.message;

    if (tooLong) {
      return NextResponse.json({ error: 'Field too long' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const phoneRow = phone ? `<p><strong>טלפון:</strong> ${escapeHtml(phone)}</p>` : '';

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // חייב להיות החשבון המאומת, אחרת Gmail ידחה
      to: process.env.EMAIL_USER,
      replyTo: email, // "השב" ימען את הפונה
      subject: `ליד חדש מפורטפוליו: ${name}`,
      text: [
        `שם: ${name}`,
        `אימייל: ${email}`,
        phone ? `טלפון: ${phone}` : null,
        `נושא: ${subject}`,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #C5A572;">התקבלה פנייה חדשה!</h2>
          <p><strong>שם:</strong> ${escapeHtml(name)}</p>
          <p><strong>אימייל:</strong> ${escapeHtml(email)}</p>
          ${phoneRow}
          <p><strong>נושא:</strong> ${escapeHtml(subject)}</p>
          <p><strong>הודעה:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // לא מחזירים את פרטי השגיאה ללקוח כדי לא לדלוף מידע על המיילר
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
