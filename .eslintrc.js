module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
    "project": "./tsconfig.json",
  },
  plugins: [
    "react",
    "@typescript-eslint",
  ],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
  },
};
