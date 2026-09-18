/**
 * כתובת הבסיס של האתר.
 *
 * צריכה להיות מוגדרת כמשתנה סביבה בסביבת ה-production (Vercel / Render / וכו').
 * בלעדיה ה-sitemap, ה-robots ותגיות ה-Open Graph יצביעו ל-localhost והם חסרי ערך.
 * ראה .env.example.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
).replace(/\/$/, '');

export const SITE_NAME = 'Leon Krasnik';

export const SITE_TITLE = 'Leon Krasnik - Practical Electronic Engineer & RF Engineer';

export const SITE_DESCRIPTION =
  'הנדסאי אלקטרוניקה ומערכות RF. תכנון מערכות, אבחון חומרה ופיתוח תוכנה. ' +
  'Practical electronic engineer specializing in RF and satellite systems, ' +
  'system design, and full-stack development.';
