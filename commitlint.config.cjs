// @ts-check

/**
 * @param {import('@commitlint/types').UserConfig} config - Commitlint configuration
 */
function defineCommitLintConfig(config) {
  return config
}

module.exports = defineCommitLintConfig({
  extends: ['@commitlint/config-conventional'],
})
