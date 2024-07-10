import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';

export const simpleImportSortConfig = [
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
