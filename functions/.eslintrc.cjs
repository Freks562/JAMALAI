/**
 * Isolated ESLint config for Cloud Functions ONLY.
 * Prevents ESLint from crawling to the project root (Next.js).
 */
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  ignorePatterns: ['lib/', 'node_modules/', 'dist/', 'build/']
};
