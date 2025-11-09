import { FlatCompat } from '@eslint/eslintrc';
import eslintjs from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import perfectionist from 'eslint-plugin-perfectionist';
import type { Linter } from 'eslint';

const compat = new FlatCompat({});

export default {
	configs: {
		flat: [
			{
				files: ['**/*.{js,mjs,cjs,ts,mts}'],
				languageOptions: {
					globals: globals.node,
					parser: tsParser,
					parserOptions: {
						projectService: true,
						tsconfigRootDir: import.meta.dirname,
					}					
				}
			},
			eslintjs.configs.recommended,
			stylistic.configs['recommended'],
			perfectionist.configs['recommended-natural'],
			...tseslint.configs.recommended,
			{
				rules: {
					'no-debugger': 'warn',
					'no-empty': ['error', { 'allowEmptyCatch': true }],
					'no-empty-pattern': ['error', { 'allowObjectPatternsAsParameters': true }],
					'no-throw-literal': 'error',
					'prefer-const': ['error', { destructuring: 'all' }],
					'prefer-rest-params': 'off',
					'perfectionist/sort-classes': [
						'error',
						{
							order: 'asc',
							type: 'natural',
							groups:[
								'index-signature',
								'static-property',
								'static-block',
								['protected-property', 'protected-accessor-property'],
								['private-property', 'private-accessor-property'],
								['property', 'accessor-property'],
								'constructor',
								['static-method', 'protected-method', 'private-method', 'method', 'get-method', 'set-method'],
								'unknown',
							]
						}
					],
					'perfectionist/sort-modules': [
						'error',
						{
							order: 'asc',
							type: 'natural',
							groups: [
								'declare-enum',
								'declare-function',
								['declare-class', 'declare-interface', 'declare-type'],
								['export-enum', 'enum'],
								['export-interface', 'export-type', 'interface', 'type'],
								['export-function', 'function'],
								['class', 'export-class']
							]
						}
					],
					'perfectionist/sort-intersection-types': 'off',
					'@stylistic/block-spacing': 'error',
					'@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
					'@stylistic/comma-dangle': ['error', 'never'],
					'@stylistic/comma-spacing': ['error', { before: false, after: true }],
					'@stylistic/dot-location': ['error', 'property'],
					'@stylistic/function-call-spacing': ['error', 'never'],
					'@stylistic/indent': [
						'error',
						'tab',
						{
							ignoredNodes: ['ConditionalExpression'],
							SwitchCase: 1
						}
					],
					'@stylistic/indent-binary-ops': ['error', 'tab'],
					'@stylistic/operator-linebreak': ["error", "before", { "overrides": { "=": "after", "+=": "after", "-=": "after" } }],
					'@stylistic/member-delimiter-style': [
						'error',
						{
							multiline: {
								delimiter: 'comma',
								requireLast: false
							},
							singleline: {
								delimiter: 'comma',
								requireLast: false
							}
						}
					],
					'@stylistic/no-extra-semi': 'off',
					'@stylistic/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
					'@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
					'@stylistic/no-trailing-spaces': 'error',
					'@stylistic/no-whitespace-before-property': 'error',
					'@stylistic/quote-props': ['error', 'consistent'],
					'@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: "always", avoidEscape: true }],
					'@stylistic/semi-spacing': 'error',
					'@stylistic/semi': ['error', 'always'],
					'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
					'@typescript-eslint/no-explicit-any': ['off'],
					'@typescript-eslint/no-restricted-types': 'warn',
					'@typescript-eslint/no-unused-vars': [
						'warn',
						{
							caughtErrors: 'none',
							ignoreRestSiblings: true,

							varsIgnorePattern: '^_$',
							argsIgnorePattern: '^_$',
							caughtErrorsIgnorePattern: '^_$'
						}
					],
					"@typescript-eslint/no-unnecessary-condition": ["error", { allowConstantLoopConditions: 'only-allowed-literals' } ],
					'@typescript-eslint/naming-convention': [
						'error',
						{
							selector: 'variable',
							types: ['array', 'boolean', 'number', 'string'],
							modifiers: ['exported', 'global'],
							format: ['UPPER_CASE']
						},
						{
							selector: 'variable',
							modifiers: ['exported', 'global'],
							format: ['StrictPascalCase']
						},
						{
							selector: 'variable',
							types: ['boolean'],
							format: null,
							filter: {
								regex: '^(changed|done|found|result|retry|waiting|(.+)Changed|(.+)Updated)$',
								match: false
							},
							prefix: ['bool', 'can', 'CAN', 'did', 'DID', 'has', 'HAS', 'is', 'IS', 'should', 'SHOULD', 'use', 'USE', 'was', 'WAS', 'will', 'WILL']
						},
						{
							selector: 'variable',
							types: ['boolean'],
							format: ['strictCamelCase'],
							filter: {
								regex: '^((.+)Changed|(.+)Updated)$',
								match: true
							},
							suffix: ['Changed', 'Updated']
						},
						{
							selector: "variable",
							format: ["strictCamelCase"],
							filter: {
								regex: '^_$',
								match: false
							},
						},
						{
							selector: ['class', 'enum', 'interface', 'typeAlias'],
							format: ['StrictPascalCase']
						},
						{
							selector: 'typeParameter',
							format: ['StrictPascalCase'],
							filter: {
								regex: '^(T|U|V)$',
								match: false
							},
							prefix: ['T']
						},
						{
							selector: 'classProperty',
							modifiers: ['private'],
							leadingUnderscore: 'require',
							format: ['strictCamelCase']
						},
						{
							selector: 'classProperty',
							modifiers: ['public'],
							leadingUnderscore: 'forbid',
							filter: {
								regex: '^(_id)$',
								match: false
							},
							format: ['strictCamelCase']
						},
						{
							selector: 'classMethod',
							filter: {
								regex: '^(toJSON)$',
								match: false
							},
							format: ['strictCamelCase']
						}
					]
				}
			}
		] as Linter.Config
	}
};