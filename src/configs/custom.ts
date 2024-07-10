import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginTailwindcss from 'eslint-plugin-tailwindcss';

type CustomConfigOptions = {
  tailwind: boolean;
  otherConfigs: TypedFlatConfigItem[];
};

export function getCustomConfigArr(options: CustomConfigOptions) {
  const { tailwind, otherConfigs } = options;

  const simpleImportSortConfig = [
    {
      name: 'simple-import-sort:rules',
      plugins: {
        'simple-import-sort': pluginSimpleImportSort,
      },
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
      },
    },
  ];

  const tailwindConfig = tailwind
    ? [
        ...pluginTailwindcss.configs['flat/recommended'],
        {
          name: 'tailwindcss',
          rules: {
            'tailwindcss/no-custom-classname': 'off',
          },
        },
      ]
    : [];

  return [
    ...simpleImportSortConfig,
    ...tailwindConfig,

    ...otherConfigs,
  ];
}
