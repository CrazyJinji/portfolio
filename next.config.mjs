/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' הוסר: Route Handlers (‎/api/contact) דורשים שרת.
  // המפתח eslint הוסר - אינו נתמך ב-Next 16.
  // typescript.ignoreBuildErrors הוסר - tsc --noEmit עובר נקי.
};

export default nextConfig;
