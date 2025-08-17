/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { ignores: ['lib/', 'node_modules/', 'dist/', 'build/'] },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: await import('@typescript-eslint/parser'),
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default
    },
    rules: {
      // keep it light for CI
      'no-unused-vars': 'warn'
    }
  }
];
