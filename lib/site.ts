/**
 * כתובת הבסיס של האתר.
 *
 * הערך נקרא אך ורק בצד השרת: layout.tsx (metadata), sitemap.ts, robots.ts
 * ו-generateMetadata של דפי הפרויקט. שום קומפוננטת לקוח לא נוגעת בו,
 * ולכן הוא לא צריך את הקידומת NEXT_PUBLIC_ ולא נכנס ל-bundle של הדפדפן.
 *
 * סדר העדיפויות:
 *   1. SITE_URL              - המשתנה המועדף, מוגדר ידנית
 *   2. NEXT_PUBLIC_SITE_URL  - תאימות לאחור אם הוא כבר מוגדר איפשהו
 *   3. VERCEL_PROJECT_PRODUCTION_URL - Vercel מזריקה אוטומטית את דומיין
 *      ה-production של הפרויקט (בלי סכמה), גם בפריסות preview.
 *      רשת ביטחון: גם אם שוכחים להגדיר כלום, ה-OG וה-sitemap עדיין נכונים.
 *   4. localhost             - פיתוח מקומי
 */
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;

  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelDomain) return `https://${vercelDomain}`;

  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl().replace(/\/$/, '');

export const SITE_NAME = 'Leon Krasnik';

export const SITE_TITLE = 'Leon Krasnik - Practical Electronic Engineer & RF Engineer';

export const SITE_DESCRIPTION =
  'הנדסאי אלקטרוניקה ומערכות RF. תכנון מערכות, אבחון חומרה ופיתוח תוכנה. ' +
  'Practical electronic engineer specializing in RF and satellite systems, ' +
  'system design, and full-stack development.';
