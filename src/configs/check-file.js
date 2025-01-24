import pluginCheckFile from 'eslint-plugin-check-file';

/**
 * 取得檢查檔案的設定。
 *
 * @param {boolean | object} checkFile - 檢查檔案的設定，可以是布林值或包含 `enabled` 和 `ignores` 屬性的物件。
 * @param {boolean} checkFile.enabled - 是否啟用檢查檔案功能。
 * @param {string[]} checkFile.ignores - 要忽略的檔案或資料夾陣列。
 * @param {string[]} checkFile.files - 要檢查的檔案陣列。
 * @param {string} checkFile.fileNamingStyle - 檔案命名風格。
 * @param {string} checkFile.folderNamingStyle - 資料夾命名風格。
 * @returns {Array<object>} 如果啟用檢查檔案功能，返回包含檢查檔案設定的陣列，否則返回空陣列。
 */
export function getCheckFileConfig(checkFile) {
  let isEnabled = false;
  let ignoresArray = [];
  const fileArr = ['src/**/*.{ts,tsx}'];
  let fileNaming = 'KEBAB_CASE';
  let folderNaming = 'KEBAB_CASE';

  if (typeof checkFile === 'boolean') {
    isEnabled = checkFile;
  } else {
    const {
      enabled = true,
      ignores = [],
      files = [],
      fileNamingStyle = 'KEBAB_CASE',
      folderNamingStyle = 'KEBAB_CASE',
    } = checkFile;

    isEnabled = enabled;
    ignoresArray = ignores;
    files.forEach((filePath) => {
      fileArr.push(filePath);
    });
    fileNaming = fileNamingStyle;
    folderNaming = folderNamingStyle;
  }

  return isEnabled
    ? [
        {
          name: 'check-file',
          plugins: {
            'check-file': pluginCheckFile,
          },
          files: fileArr,
          rules: {
            'check-file/filename-naming-convention': [
              'error',
              { '**/!(__)*': `${fileNaming}` },
              { ignoreMiddleExtensions: true },
            ],
            'check-file/folder-naming-convention': ['error', { '**/!(__tests__)': `${folderNaming}` }],
          },
          ignores: ignoresArray,
        },
      ]
    : [];
}
