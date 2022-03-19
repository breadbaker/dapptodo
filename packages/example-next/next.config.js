/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    infuraKey: process.env.INFURA_KEY,
    alchemyKey: process.env.ALCHEMY_KEY,
    magicKey: process.env.MAGIC_KEY,
  },

  webpack: (config) => {
    config.resolve.modules.push(__dirname);

    return config;
  },
}

module.exports = nextConfig
