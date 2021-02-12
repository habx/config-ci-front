module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['import-helpers', 'prettier'],
  rules: {
    'no-console': 'error',
    'no-debugger': 'warn',
    'no-empty': 'error',
    'no-shadow': ['error', { allow: ['_', 'e'] }],
    'prefer-template': 'error',

    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],

    'import-helpers/order-imports': ['warn', {
      newlinesBetween: 'always',
      groups: [
        'module',
        '/^@habx/',
        '/^@components/',
        [
          '/^@assets/',
          '/^@api/',
          '/^@config/',
          '/^@constants/',
          '/^@fonts/',
          '/^@globalTypes/',
          '/^@helpers/',
          '/^@hooks/',
          '/^@lib/',
          '/^@logic/',
          '/^@pages/',
          '/^@puppeteer/',
          '/^@query/',
          '/^@routes/',
          '/^@style/',
          '/^@utils/',
        ],
        'parent',
        ['sibling', 'index'],
      ],
      alphabetize: { order: 'asc', ignoreCase: true },
    }],

    'prettier/prettier': ['warn', {
      trailingComma: 'es5',
      tabWidth: 2,
      semi: false,
      singleQuote: true,
      'prefer-template': true,
    }],

    'react/jsx-key': 'warn',
  }
}
