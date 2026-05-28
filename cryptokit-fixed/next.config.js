const createNextIntlPlugin = require('next-intl/plugin');

// Trỏ đến file i18n.ts ở root
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withNextIntl(nextConfig);
