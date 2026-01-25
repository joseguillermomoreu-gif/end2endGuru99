/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:playwright/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    ignorePatterns: ["*.spec.ts"],
    rules: {
        'max-lines': ["error", {"max": 120}],
        "max-lines-per-function": ["error", 15],
        'playwright/expect-expect': 'off',
        'playwright/no-nth-methods': 'off'
    }
};