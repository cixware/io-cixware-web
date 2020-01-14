const status = (process.env.NODE_ENV === 'production') ? 'error' : 'warn';

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'indent': [
      status,
      2
    ],
    'quotes': [
      status,
      'single'
    ],
    'semi': [
      status,
      'always'
    ],
    'import/extensions': ['error', 'always', {
      'js': 'never',
    }],
    "camelcase": [
      0, {
        "properties": "never"
      }
    ],
    "no-underscore-dangle": [
      0, {
        "properties": "never"
      }
    ],
    'consistent-return': [0, 'never'],
    'no-console': status,
    'no-debugger': status,
    'max-len': 'off',
    'linebreak-style': ["error", "unix"],
    'import/prefer-default-export': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
