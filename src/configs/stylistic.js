export const stylisticConfig = {
  semi: true,
  overrides: {
    'style/arrow-parens': ['error', 'always'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/linebreak-style': 0,
    'style/no-tabs': ['error', { allowIndentationTabs: true }],
    'style/jsx-max-props-per-line': ['error', { maximum: 3 }],
    'antfu/curly': 0,
    'antfu/if-newline': 0,
  },
};
