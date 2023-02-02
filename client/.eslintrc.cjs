module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:cypress/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'cypress'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-underscore-dangle': 0,
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-pause': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
      },
    ],
  },
  ignorePatterns: [
    'tailwind.config.cjs',
    'postcss.config.cjs',
    'vite.config.ts',
    'cypress.d.ts',
  ],
};
