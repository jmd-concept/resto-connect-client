/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    compress: true,
    reactStrictMode: true,
    transpilePackages: ['some-package'],

    images: {
        unoptimized: !isProd, // false en producción para usar el optimizador de imágenes de Next.js
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },

    // verrouille ton app contre l’injection de scripts externes non autorisés.
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "Cache-Control", value: "no-store" }, // empêche le cache sur tes pages/app
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },

                    { key: "Permissions-Policy", value: "camera=(self)" }
                ],
            },
        ];
    },

    env: {
        API_URL: process.env.API_URL || 'http://localhost:5000/endPoint',
    }
};

export default nextConfig;




/*async rewrites() {
       return [
           {
               source: '/api/:path*',
               destination: 'http://127.0.0.1:5000/endPoint/:path*',
           },
           {
               source: '/services',
               destination: '/',
               has: [{ type: 'header', key: 'next-action' }],
           },
       ];
   },
*/

/*  async headers() {
        return [
            {
                source: '/videos/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    }, */