import type { OptionsConfig } from '@antfu/eslint-config';

type AntfuConfigFactoryOptions = {
  framework: 'vue' | 'react';
  vueVersion: 2 | 3;
};

export function getAntfuConfig(options: AntfuConfigFactoryOptions): OptionsConfig {
  const { framework, vueVersion } = options;

  return {
    vue: framework === 'vue' && {
      vueVersion,
      overrides: {
        'vue/block-order': [
          'error',
          {
            order: ['template', 'script', 'style'],
          },
        ],
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: { max: 3 },
            multiline: { max: 1 },
          },
        ],
        'vue/max-len': [
          'error',
          {
            code: 100,
            template: 120,
            ignorePattern: '',
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
            ignoreHTMLAttributeValues: true,
            ignoreHTMLTextContents: true,
          },
        ],
      },
    },

    react: framework === 'react',

    stylistic: {
      semi: true,
      overrides: {
        'style/arrow-parens': ['error', 'always'],
        'style/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        'style/linebreak-style': 0,
        'style/jsx-max-props-per-line': ['error', { maximum: 3 }],
        'antfu/curly': 0,
        'antfu/if-newline': 0,
      },
    },

    javascript: {
      overrides: {
        'sort-imports': 0,
        'no-console': 'off',
        'unused-imports/no-unused-vars': 'warn',
      },
    },

    typescript: {
      overrides: {
        'ts/consistent-type-definitions': ['error', 'type'],
      },
    },
  };
}
