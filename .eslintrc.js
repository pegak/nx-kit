module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: ['airbnb', 'airbnb-typescript', 'plugin:jest/recommended', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    // temp solution
    createDefaultProgram: true,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/no-use-before-define': [0],
    // there seems to be an issue with @typescript-eslint
    // without this an react import throws this error
    '@typescript-eslint/no-loop-func': [0],
    'jest/expect-expect': [0],
    'import/prefer-default-export': [0],
    'react/jsx-props-no-spreading': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'react/jsx-one-expression-per-line': [0],
    'jsx-a11y/label-has-associated-control': [0],
    'react/prop-types': [0],
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'arrow-body-style': ['warn'],
    'react/require-default-props': [0],
  },
};
