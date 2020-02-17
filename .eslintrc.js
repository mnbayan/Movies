module.exports = {
  globals: {
    fetch: false
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  rules: {
    'import/prefer-default-export': 'off',
    camelcase: 'off',
    'no-use-before-define': 'off',
    'no-restricted-syntax': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/prop-types': [
      'error',
      { ignore: ['navigation', 'children', 'style'] }
    ],
    'global-require': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'prettier/prettier': ['error']
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.native.js'],
        paths: ['./src', './assets']
      }
    }
  }
};
