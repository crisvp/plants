module.exports = {
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:import/recommended',
    'plugin:vue/vue3-recommended',
  ],
  settings: {
    'import/ignore': ['node_modules'],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort', 'unused-imports'],
  root: true,
  ignorePatterns: [
    '.typedoc.config.cjs',
    '.vscode*',
    'postcss.config.js',
    'node_modules/',
    'dist/',
    'build/',
    'chrome-profile*',
    'vendor/',
    '**/.eslintrc.*',
    'src/manifest.js',
    'doc/coverage',
    'assets/',
    'tailwind.config.js',
    'doc/api',
    'playwright-report',
    'tests/results',
  ],
  globals: {
    chrome: 'readonly',
  },
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': ['error', { varsIgnorePattern: '^debug$' }],
    'unused-imports/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^(_|debug$)',
        argsIgnorePattern: '^_',
      },
    ],
    'consistent-return': 'error',
    complexity: ['warn', 10],
    'import/no-unresolved': 'off',
    'no-else-return': 'warn',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off', // XSS is not a concern in our case
    'vue/first-attribute-linebreak': 'off',
    'vue/html-self-closing': 'off',
  },
  overrides: [
    {
      files: ['*.cjs'],
      parserOptions: { project: false, sourceType: 'script' },
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
    {
      files: ['tests/**/*'],
      rules: {
        'vue/one-component-per-file': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
    {
      files: ['src/lib/chrome/**/*.ts', 'src/lib/logger/**/*', 'src/lib/pinia-chrome-extension/**/*'],
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
