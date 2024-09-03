import antfu from '@antfu/eslint-config';

import { javascriptConfig } from './configs/javascript.js';
import { simpleImportSortConfig } from './configs/simple-import-sort.js';
import { stylelisticConfig } from './configs/stylistic.js';
import { getTailwindConfig } from './configs/tailwindcss.js';
import { vueConfig } from './configs/vue.js';

/**
 * Factory function to create an ITO configuration object.
 *
 * @param {object} options - The options for the configuration.
 * @param {string} options.framework - Which framework to use.
 * @param {number} options.vueVersion - The version of Vue.js to use.
 * @param {boolean} options.tailwind - Whether to include Tailwind CSS.
 * @param {boolean} options.typescript - Whether to include TypeScript.
 * @param {Array} options.otherConfigs - Additional configuration objects.
 * @returns {object} - The ITO configuration object.
 */
function itoConfigFactory(options) {
  const {
    framework = 'vue',
    vueVersion = 3,
    tailwind = false,
    typescript = true,
    otherConfigs = [],
  } = options || {};

  const tailwindConfig = getTailwindConfig(tailwind);

  return antfu(
    {
      vue: framework === 'vue' && {
        version: vueVersion,
        ...vueConfig,
      },

      react: framework === 'react',

      stylistic: stylelisticConfig,

      javascript: javascriptConfig,

      typescript: typescript && {
        overrides: {
          'ts/consistent-type-definitions': ['error', 'type'],
        },
      },
    },

    ...simpleImportSortConfig,

    ...tailwindConfig,

    ...otherConfigs,
  );
}

export default itoConfigFactory;
