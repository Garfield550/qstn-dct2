// @ts-check

const { defineConfig } = require('eslint-define-config')
const { readGitignoreFiles } = require('eslint-gitignore')

module.exports = defineConfig({
  root: true,
  ignorePatterns: readGitignoreFiles(),
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
    'tailwindcss',
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
  },
  overrides: [
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    'import/resolver': {
      node: true,
      typescript: true,
    },
    tailwindcss: {
      callees: ['cn'],
      config: 'tailwind.config.cjs',
    },
    next: {
      rootDir: ['./'],
    },
  },
})
