module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "import"],
  rules: {
    "prettier/prettier": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
        alwaysTryTypes: true,
      },
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
};
