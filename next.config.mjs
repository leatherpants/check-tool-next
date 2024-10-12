/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   ppr: 'incremental',
  // },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/checks',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
