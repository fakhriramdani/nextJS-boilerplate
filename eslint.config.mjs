import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const boundaryRule = (moduleNames, relativePatterns, baseMessage) => ({
  "no-restricted-imports": [
    "error",
    {
      paths: moduleNames.map((name) => ({ name, message: baseMessage + " '" + name + "'." })),
      patterns: relativePatterns,
    },
  ],
});

const todosLayer = (files, moduleNames, relativePatterns, baseMessage) => [
  {
    files,
    rules: {
      ...boundaryRule(moduleNames, relativePatterns, baseMessage),
    },
  },
];

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  ...todosLayer(
    ["src/modules/todos/domain/**/*.ts", "src/modules/todos/domain/**/*.tsx"],
    ["next", "react", "zod"],
    ["**/application/**", "**/infrastructure/**", "**/presentation/**", "**/shared/**"],
    "domain layer must not depend on"
  ),

  ...todosLayer(
    ["src/modules/todos/application/**/*.ts", "src/modules/todos/application/**/*.tsx"],
    ["next", "react"],
    ["**/infrastructure/**", "**/presentation/**"],
    "application layer must not depend on"
  ),

  ...todosLayer(
    ["src/modules/todos/infrastructure/**/*.ts", "src/modules/todos/infrastructure/**/*.tsx"],
    ["next", "react"],
    ["**/application/**", "**/presentation/**"],
    "infrastructure layer must not depend on"
  ),

  {
    files: ["src/app/**/*.ts", "src/app/**/*.tsx", "src/app/**/route.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["**/modules/todos/domain/**"], message: "app must import todos via '@/modules/todos' index, not domain" },
            { group: ["**/modules/todos/application/**"], message: "app must import todos via '@/modules/todos' index, not application" },
            { group: ["**/modules/todos/infrastructure/**"], message: "app must import todos via '@/modules/todos' index, not infrastructure" },
            { group: ["**/modules/todos/presentation/**"], message: "app must import todos via '@/modules/todos' index, not presentation" },
          ],
        },
      ],
    },
  },

  {
    files: [
      "src/modules/todos/presentation/**/*.ts",
      "src/modules/todos/presentation/**/*.tsx",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["**/modules/*/domain/**"], message: "cross-feature presentation must import domain via feature index" },
            { group: ["**/modules/*/application/**"], message: "cross-feature presentation must import application via feature index" },
            { group: ["**/modules/*/infrastructure/**"], message: "cross-feature presentation must import infrastructure via feature index" },
          ],
        },
      ],
    },
  },
]);
