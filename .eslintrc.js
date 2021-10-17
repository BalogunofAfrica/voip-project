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
    "airbnb-typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "prettier",
    "import",
    "unicorn",
    "simple-import-sort",
    "sort-keys-fix",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react/jsx-sort-props": ["error", { ignoreCase: true }],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: { args: false, props: false, ref: false, params: false },
      },
    ],
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/destructuring-assignment": ["error", "never"],
    "eol-last": ["error", "always"],
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "no-unused-vars": "off",
    "import/no-default-export": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "sort-keys-fix/sort-keys-fix": "warn",
    "unicorn/no-null": "off",
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: ["@typescript-eslint"],
      rules: {
        "unicorn/require-post-message-target-origin": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
      },
    },
    {
      files: "**/*.tsx",
      rules: {
        "prefer-destructuring": "off",
        "unicorn/prefer-module": "off",
        "global-require": "off",
      },
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
