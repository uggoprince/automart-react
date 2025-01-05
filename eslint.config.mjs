import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    // extends: [
    //   // "plugin:prettier/recommended", // Add Prettier plugin recommendations
    //   // "next",
    //   // "next/core-web-vitals",
    //   // "eslint:recommended",
    //   // "plugin:@typescript-eslint/recommended",
    //   // "plugin:react/recommended", "prettier"
    // ],
    // plugins: ["prettier", "next"], // Include Prettier plugin
    // rules: {
    //   "prettier/prettier": [
    //     "error",
    //     {
    //       "singleQuote": true,
    //       "semi": true
    //     }
    //   ], // Ensure Prettier formatting issues show as errors
    // },
  },
];
