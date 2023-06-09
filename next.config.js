// @ts-check

/**
 * @param {import('next').NextConfig} config - Next.js configuration
 */
function defineNextConfig(config) {
  return config
}

export default defineNextConfig({
  experimental: {
    appDir: true,
  },
  output: 'standalone',
})
