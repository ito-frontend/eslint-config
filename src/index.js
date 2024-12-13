import antfu from '@antfu/eslint-config';

import { getCheckFileConfig } from './configs/check-file.js';
import { javascriptConfig } from './configs/javascript.js';
import { stylisticConfig } from './configs/stylistic.js';
import { getTailwindConfig } from './configs/tailwindcss.js';
import { vueConfig } from './configs/vue.js';

const perfectionistSortConfig = [
  {
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          newlinesBetween: 'always',
        },
      ],
    },
  },
];

/**
 * 工廠函數，用於創建各種框架和工具的 ESLint 設定物件。
 *
 * @param {object} options - 設定選項。
 * @param {string} [options.framework] - 要使用的框架（'vue' 或 'react'）。
 * @param {number} [options.vueVersion] - 要使用的 Vue 版本（如果框架是 'vue'）。
 * @param {boolean} [options.tailwind] - 是否包含 Tailwind CSS 設定。
 * @param {boolean} [options.typescript] - 是否包含 TypeScript 設定。
 * @param {boolean | object} [options.checkFile] - 是否包含文件檢查設定。
 * @param {boolean} [options.checkFile.enabled] - 啟用或禁用文件檢查設定的標誌。
 * @param {string[]} [options.checkFile.ignores] - 要忽略的文件列表。
 * @param {Array} [options.otherConfigs] - 要合併的其他設定。
 * @returns {object} 生成的設定物件。
 */
function itoConfigFactory(options) {
  const {
    framework = 'vue',
    vueVersion = 3,
    tailwind = false,
    typescript = true,
    checkFile = false,
    otherConfigs = [],
  } = options || {};

  const tailwindConfig = getTailwindConfig(tailwind);
  const checkFileConfig = getCheckFileConfig(checkFile);

  return antfu(
    {
      vue: framework === 'vue' && {
        version: vueVersion,
        ...vueConfig,
      },

      react: framework === 'react',

      stylistic: stylisticConfig,

      javascript: javascriptConfig,

      typescript: typescript && {
        overrides: {
          'ts/consistent-type-definitions': ['error', 'type'],
        },
      },
    },

    ...perfectionistSortConfig,

    ...tailwindConfig,

    ...checkFileConfig,

    ...otherConfigs,
  );
}

export default itoConfigFactory;
