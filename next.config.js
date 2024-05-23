/** @type {import('next').NextConfig} */
const path = require('path');
const webpack = require('webpack');

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',

  // config to disable precaching in app
  runtimeCaching: [],
  publicExcludes: ['!**/*'],
  buildExcludes: [() => true],
  fallbacks: false,
  cacheStartUrl: false,
  cleanupOutdatedCaches: true,
});

const nextConfig = {
  images: {
    domains: ['deuchsmyljhkplwsfgit.supabase.co'],
  },
  reactStrictMode: true,
  env: {
    // Add env here that you need client side.
    // NOTE this is dangerous!
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
};

module.exports = withPWA(nextConfig);
