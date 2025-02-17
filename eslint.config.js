import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginTs, { config } from 'typescript-eslint';

const flatCompat = new FlatCompat();

export default config([
    {
        files: ['**/*.{ts,tsx}'],
        settings: {
            react: {
                version: 'detect',
            },
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            import: pluginImport,
            // 'react-refresh': pluginReactRefresh,
            'react-hooks': pluginReactHooks,
        },
    },
    pluginJs.configs.recommended,
    ...pluginTs.configs.strict,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],
    pluginReactRefresh.configs.recommended,
    ...fixupConfigRules(flatCompat.extends('plugin:storybook/recommended')),
    {
        rules: {
            'react/self-closing-comp': 'error',
            'react-refresh/only-export-components': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-one-expression-per-line': 'off',
            'react/function-component-definition': 'off',
            'react/jsx-newline': 'off',
            'react/jsx-max-props-per-line': 'off',
            'react/jsx-sort-props': 'off',
            'react/jsx-no-bind': 'off',
            'react/jsx-no-literals': 'off',
            'react/jsx-max-depth': 'off',
            'react/jsx-props-no-spreading': 'off',
            'react/forbid-component-props': 'off',
            'react/jsx-indent': 'off',
            '@typescript-eslint/no-dynamic-delete': 'off',
            '@typescript-eslint/unified-signatures': 'off',
            'no-duplicate-imports': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
        },
    },
]);
