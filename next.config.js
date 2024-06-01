/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/analyze',
        permanent: true, // This flag indicates that the redirect is permanent (HTTP 301 status)
      },
    ];
  },
};

module.exports = nextConfig;
