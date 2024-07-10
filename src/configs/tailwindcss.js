import pluginTailwindcss from 'eslint-plugin-tailwindcss';

/**
 * Get the Tailwind CSS configuration.
 *
 * @param {boolean} enabled - Whether Tailwind CSS is enabled or not.
 * @returns {Array} - The Tailwind CSS configuration.
 */
export function getTailwindConfig(enabled = false) {
  return enabled
    ? [
        ...pluginTailwindcss.configs['flat/recommended'],
        {
          name: 'tailwindcss:rules',
          rules: {
            'tailwindcss/no-custom-classname': 'off',
          },
        },
      ]
    : [];
}
