/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`localhost`, `localhost:3000`, `localhost:3001`],
  },
  i18n: {
    locales: ['en', 'he'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
