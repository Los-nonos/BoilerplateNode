module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "general",
        "fix",
        "ci",
        "refactor",
        "build",
        "implementation",
        "merge",
        "test",
      ],
    ],
  },
};
