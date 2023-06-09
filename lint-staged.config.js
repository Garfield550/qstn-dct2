// @ts-check

import path from 'node:path'

/**
 * @param {import('lint-staged').Config} config - Lint-staged configuration
 */
function defineLintStagedConfig(config) {
  return config
}

export default defineLintStagedConfig({
  '**/*.(ts|tsx|js|jsx|mjs|cjs)': (filenames) =>
    `next lint --fix --file ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(' --file ')}`,

  '**/*.(md|json|html|yml|yaml)': (filenames) =>
    `prettier --write ${filenames.join(' ')}`,
})
