module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "error",
    indent: ["error", 2],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": 0,
    "import/newline-after-import": 0,
    "no-underscore-dangle": 0,
    "import/no-extraneous-dependencies": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react/function-component-definition": 0,
    "default-param-last": 0,
    "no-param-reassign": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "import/prefer-default-export": 0,
    "no-nested-ternary": 0,
    "no-alert": 0,
  },
};
