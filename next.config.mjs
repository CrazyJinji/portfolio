/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // מוחרג כנדרש עבור תמיכה ב-Route Handlers (API)
  eslint: { ignoreDuringBuilds: true }, 
  typescript: { ignoreBuildErrors: true } 
};

// ייצוא בתקן ESM
export default nextConfig;