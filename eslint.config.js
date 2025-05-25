import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

/** @type { import("eslint").Linter[] } */
export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"]
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: [globals.node, globals.jest]
        },
        rules: {
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "eqeqeq": ["error", "always"],
            "no-var": "error",
            "prefer-const": "warn",
            "arrow-spacing": "warn",
            "object-curly-spacing": ["warn", "always"],
            "semi": ["error", "always"],
        },
    },
]);
