import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';

export const simpleImportSortConfig = [
  {
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
];
