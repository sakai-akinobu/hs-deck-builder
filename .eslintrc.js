module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "sourceType": "module",
  },
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-explicit-any": "off",
  },
};
