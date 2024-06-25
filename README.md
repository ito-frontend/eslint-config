# OneAd ITO ESLint Config

* 整合[eslint-plugin-tailwindcss](https://github.com/francoismassart/eslint-plugin-tailwindcss)，對tailwind class進行排序。
* 整合[eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)，對import進行排序。
* 由[eslint-stylistic](https://github.com/eslint-stylistic/eslint-stylistic)進行排版，並不會強制換行，可自行在開發時手動用prettier排版。
* 採用[ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)模式(ESLint >= v8.57.0)，擴充與設定更方便。
* package存於`verdaccio`的private環境中，外網無法直接取得設定。

### Powered by [@antfu/eslint-config](https://github.com/antfu/eslint-config/tree/main)

## Install
1. 在需要安裝的專案中新增`.npmrc`檔案，設置npm的registry，才能下載到verdaccio中的package。
```bash
# orgName:registry=http:ip-of-verdaccio-server:port
@onead-ito:registry=http://192.168.1.199:4873/
```
2. `pnpm add -D @onead-ito/eslint-config`
3. `cmd+shift+p` > `Preferences: Open Workspace Settings (JSON)` > 貼上。
```jsonc
{
  // Disable the default formatter
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "@stylistic/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // The following is optional.
  // It's better to put under project setting `.vscode/settings.json`
  // to avoid conflicts with working with different eslint configs
  // that does not support all formats.
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ]
}
```
4. 專案新增`eslint.config.mjs`
#### Type Declaration
```ts
export interface DefaultItoConfig {
  /**
   * Vue的版本號
   * @default 3
   */
  vueVersion?: 2 | 3;
  /**
   * 是否有使用Tailwind
   * @default false
   */
  tailwind?: boolean;[內碼] 
}
```

#### Usage
```js
// eslint.config.mjs
import ito from '@onead-ito/eslint-config';

export default ito();
```

## Publish
1. 如果未建立帳號，請先建立帳號，registry後面接`verdaccio`主機的ip與port號
```bash
npm adduser --registry http://192.168.1.199:4873/
```
2. `pnpm build`
3. `pnpm publish`，會自動把最新版推到`verdaccio`上。
