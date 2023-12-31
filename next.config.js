// @ts-check

/**
 * @param {import('next').NextConfig} config - Next.js configuration
 */
function defineNextConfig(config) {
  return config
}

export default defineNextConfig({
  reactStrictMode: true,
  // output: 'standalone', // standalone for Docker deployment
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fix @walletconnect/legacy-client build error
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
})
