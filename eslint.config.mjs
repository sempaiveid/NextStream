import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      import: importPlugin,
      boundaries,
    },

    settings: {
      "import/resolver": {
        typescript: true,
      },

      "boundaries/elements": [
        {
          type: "shared",
          pattern: "src/shared/*",
        },
        {
          type: "entities",
          pattern: "src/entities/*",
        },
        {
          type: "features",
          pattern: "src/features/*",
        },
        {
          type: "widgets",
          pattern: "src/widgets/*",
        },
        {
          type: "pages",
          pattern: "src/pages/*",
        },
        {
          type: "app",
          pattern: "src/app/*",
        },
      ],
    },

    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
          },
        },
      ],

      "import/no-cycle": "error",

      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "shared",
              allow: ["shared"],
            },

            {
              from: "entities",
              allow: ["shared", "entities"],
            },

            {
              from: "features",
              allow: ["shared", "entities", "features"],
            },

            {
              from: "widgets",
              allow: ["shared", "entities", "features", "widgets"],
            },

            {
              from: "pages",
              allow: [
                "shared",
                "entities",
                "features",
                "widgets",
                "pages",
              ],
            },

            {
              from: "app",
              allow: ["*"],
            },
          ],
        },
      ],
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;