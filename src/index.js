import antfu from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'

import { javascriptConfig } from './configs/javascript.js'
import { simpleImportSortConfig } from './configs/simple-import-sort.js'
import { stylelisticConfig } from './configs/stylistic.js'
import { getTailwindConfig } from './configs/tailwindcss.js'
import { vueConfig } from './configs/vue.js'

/**
 * Factory function to create an ITO configuration object.
 *
 * @param {object} options - The options for the configuration.
 * @param {number} options.vueVersion - The version of Vue.js to use.
 * @param {boolean} options.tailwind - Whether to include Tailwind CSS.
 * @param {Array} options.otherConfigs - Additional configuration objects.
 * @returns {object} - The ITO configuration object.
 */
function itoConfigFactory(options) {
  const { vueVersion = 3, tailwind = false, otherConfigs = [] } = options || {}
  const tailwindConfig = getTailwindConfig(tailwind)

  return antfu(
    {
      vue: ['vue', 'nuxt', 'vitepress', '@slidev/cli'].some((p) => isPackageExists(p)) && {
        version: vueVersion,
        ...vueConfig,
      },

      react: isPackageExists('react'),

      stylistic: stylelisticConfig,

      javascript: javascriptConfig,
    },

    ...simpleImportSortConfig,

    ...tailwindConfig,

    ...otherConfigs
  )
}

export default itoConfigFactory
