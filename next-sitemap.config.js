/** @type {import('next-sitemap').IConfig} */
const siteUrl =
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
};
