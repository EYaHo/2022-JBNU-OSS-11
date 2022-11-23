module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    mocha: true,
  },
  extends: ['airbnb-base'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'no-restricted-globals': 'off',
    'import/no-unresolved': 'off',
  },
};
