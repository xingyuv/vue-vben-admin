import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:n/recommended',
    'plugin:import/recommended',
    'plugin:regexp/recommended',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.*?.json',
    createDefaultProgram: false,
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue', '@typescript-eslint', 'import', 'simple-import-sort'],
  rules: {
    'prettier/prettier': 'error',
    eqeqeq: ['warn', 'always', { null: 'never' }],
    'no-console': 'warn',
    'no-unused-vars': 'off',
    'no-case-declarations': 'off',
    'no-use-before-define': 'off',
    'no-empty-function': 'off',
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'no-debugger': 'error',
    'keyword-spacing': 'off',
    'space-before-function-paren': 'off',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],

    'n/no-missing-import': 'off',
    'n/no-unpublished-import': 'off',
    'n/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=18.0.0',
        ignores: [],
      },
    ],
    'n/no-extraneous-import': [
      'error',
      {
        allowModules: ['unbuild', '@vben/vite-config', 'vitest'],
      },
    ],

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'off',

    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': false,
      },
    ],
    '@typescript-eslint/keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
        overrides: {
          return: { after: true },
          throw: { after: true },
          case: { after: true },
        },
      },
    ],
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'methods'],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    'vue/attributes-order': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-explicit-emits': 'error',
    'vue/prefer-import-from-vue': 'error',
    'vue/multiline-html-element-content-newline': 'error',
    'vue/html-closing-bracket-newline': 'error',
    'vue/one-component-per-file': 'error',
    'vue/custom-event-name-casing': 'error',
    'vue/script-setup-uses-vars': 'error',
    'vue/no-reserved-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/multi-word-component-names': 'off',
  },
  overrides: [
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
    },
    {
      files: ['**.test.ts'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': 'off',
      },
    },
  ],
  globals: { defineOptions: 'readonly' },
  ignorePatterns: ['**/vendor/**', '**/dist/**', '**/node_modules/**'],
  settings: {
    'import/resolver': {
      node: { extensions: ['.ts', '.d.ts', '.tsx'] },
    },
    'import/ignore': ['node_modules'],
  },
});
