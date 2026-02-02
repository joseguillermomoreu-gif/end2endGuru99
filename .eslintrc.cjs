/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:playwright/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    ignorePatterns: ["*.spec.ts"],
    rules: {
        // Reglas existentes
        'max-lines': ["error", {"max": 120}],
        "max-lines-per-function": ["error", 15],
        'playwright/expect-expect': 'off',
        'playwright/no-nth-methods': 'off',

        // Reglas de indentación y formato - 2 espacios (convención TypeScript/Playwright)
        '@typescript-eslint/indent': ['error', 2],
        'indent': 'off', // Deshabilitado en favor de @typescript-eslint/indent
        'no-tabs': 'error',
        'no-trailing-spaces': 'error',
        'eol-last': 'error'
    }
};
