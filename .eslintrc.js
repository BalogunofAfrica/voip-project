module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:unicorn/recommended",
    "airbnb",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "prettier",
    "import",
    "unicorn",
  ],
  rules: {
    "prettier/prettier": ["error"],
    "react/jsx-sort-props": ["error", { ignoreCase: true }],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: { args: false, props: false, ref: false, params: false },
      },
    ],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/destructuring-assignment": ["error", "never"],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".ts", ".tsx"],
      },
    ],
    "eol-last": ["error", "always"],
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "no-unused-vars": "warn",
    "sort-keys": "warn",
    "sort-imports": "warn",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      plugins: ["@typescript-eslint"],
      rules: {
        "unicorn/require-post-message-target-origin": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
      },
    },
    {
      files: "**/*.tsx",
      rules: { "unicorn/no-null": "off", "prefer-destructuring": "off" },
    },
    {
      files: "**/*.{test,spec}.{ts,tsx}",
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          { devDependencies: true },
        ],
        "react/jsx-props-no-spreading": "off",
      },
    },
  ],
  settings: {
    react: {
      createClass: "createReactClass",
      pragma: "React",
      fragment: "Fragment",
      version: "detect",
    },
  },
};
