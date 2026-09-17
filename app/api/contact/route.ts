import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // חילוץ הנתונים מהבקשה
    const body = await request.json();
    const { name, email, subject, phone, message } = body;

    // ולידציה בסיסית בצד שרת
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // הגדרת חיבור ה-SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // מבנה המייל שיישלח אליך
    const mailOptions = {
      from: process.env.EMAIL_USER, // המייל נשלח מהשרת שלך
      to: process.env.EMAIL_USER,   // המייל נשלח אלייך (לעצמך)
      replyTo: email,               // לחיצה על "השב" תמען את הלקוח
      subject: `ליד חדש מפורטפוליו: ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #C5A572;">התקבלה פנייה חדשה!</h2>
          <p><strong>שם:</strong> ${name}</p>
          <p><strong>אימייל:</strong> ${email}</p>
          <p><strong>טלפון:</strong> ${phone}</p>
          <p><strong>נושא:</strong> ${subject || phone}</p>
          <p><strong>הודעה:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message || 'לא הוזנה הודעה.'}</p>
        </div>
      `,
    };

    // ביצוע השליחה
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}