require("dotenv").config();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  },
}

module.exports = nextConfig
