import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Apply to JavaScript/TypeScript files
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error", // Prettier violations as errors
    },
    ignores: ["node_modules/", ".next", ".out"], // Ignore these directories
  },
];

export default eslintConfig;
