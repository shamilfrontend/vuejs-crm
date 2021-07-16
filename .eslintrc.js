module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  settings: {
    'import/resolve': {
      'extensions': ['.vue', '.js']
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undef': 'off',
    'no-nested-ternary': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-return-await': 'off',
    'func-names': 'off',
    'no-unused-vars': 'off',
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never',
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
