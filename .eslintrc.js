module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard','prettier','plugin:jest/recommended'],
   "plugins": ["jest"],
  overrides: [
    {
      env: {
        node: true 
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {},
  "ignorePatterns": ["node_modules/", "build/", "dist/","cypress/"]
}
