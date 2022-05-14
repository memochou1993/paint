module.exports = {
  extends: [
    'airbnb-typescript/base',
    'plugin:import/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-shadow': 'off',
  },
};
