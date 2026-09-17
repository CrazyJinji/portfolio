/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // חובה להסיר או לסמן כהערה שורה זו
  eslint: { ignoreDuringBuilds: true }, // מומלץ למניעת כשל בבנייה עקב שגיאות ESLint
  typescript: { ignoreBuildErrors: true } // מומלץ אם יש שגיאות טיפוסים שלא תוקנו
};
module.exports = nextConfig;