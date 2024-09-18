import pluginCheckFile from 'eslint-plugin-check-file';

/**
 * 取得檢查檔案的設定。
 *
 * @param {boolean | object} checkFile - 檢查檔案的設定，可以是布林值或包含 `enabled` 和 `ignores` 屬性的物件。
 * @param {boolean} checkFile.enabled - 是否啟用檢查檔案功能。
 * @param {Array<string>} checkFile.ignores - 要忽略的檔案或資料夾陣列。
 * @returns {Array<object>} 如果啟用檢查檔案功能，返回包含檢查檔案設定的陣列，否則返回空陣列。
 */
export function getCheckFileConfig(checkFile) {
  let isEnabled = false;
  let ignoresArray = [];

  if (typeof checkFile === 'boolean') {
    isEnabled = checkFile;
  } else {
    isEnabled = checkFile.enabled;
    ignoresArray = checkFile.ignores;
  }

  return isEnabled
    ? [
        {
          name: 'check-file',
          plugins: {
            'check-file': pluginCheckFile,
          },
          files: ['src/**/*.{ts,tsx}'],
          rules: {
            'check-file/filename-naming-convention': [
              'error',
              { '**/!(__)*': 'KEBAB_CASE' },
              { ignoreMiddleExtensions: true },
            ],
            'check-file/folder-naming-convention': [
              'error',
              { '**/!(__tests__)': 'KEBAB_CASE' },
            ],
          },
          ignores: ignoresArray,
        },
      ]
    : [];
}
