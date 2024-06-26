# OneAd ITO ESLint Config

### Powered by [@antfu/eslint-config](https://github.com/antfu/eslint-config/tree/main)

* 整合[eslint-plugin-tailwindcss](https://github.com/francoismassart/eslint-plugin-tailwindcss)，對tailwind class進行排序。
* 整合[eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)，對import進行排序。
* 由[eslint-stylistic](https://github.com/eslint-stylistic/eslint-stylistic)進行排版，並不會強制換行，可自行在開發時手動用prettier排版。
* 採用[ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)模式(ESLint >= v8.57.0)，擴充與設定更方便。
* 自動判斷是使用react還是vue。

## Install
1. 在github上新增`Personal access tokens`，如果有設置過可跳過。路徑為
`Settings > Developer settings > Personal access tokens > Tokens (classic) > Generate new token (classic)`
![](image.png)

2. npm設置全局registry，如果有設置過可跳過。
```bash
npm config set @ito-frontend:registry https://npm.pkg.github.com/ && npm config set //npm.pkg.github.com/:_authToken=YOUR_ACCESS_TOKEN
```
2. `pnpm add -D @ito-frontend/eslint-config`
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
```js
// eslint.config.mjs
import ito from '@onead-ito/eslint-config';

export default ito();
```
```ts
// ito工廠函數的預設參數
interface DefaultItoConfig {
  /**
   * Vue的版本號
   * @default 3
   */
  vueVersion?: 2 | 3;
  /**
   * 是否有使用Tailwind
   * @default false
   */
  tailwind?: boolean;
  /**
   * 其他自定義ESLint Flat Configs
   * @default TypedFlatConfigItem[]
   */
  otherConfigs?: TypedFlatConfigItem[];
}
```

## Publish
1. `pnpm release`，`bumpp`會自動提升版號。
2. 到Github中新增release，之後觸發Github Actions自動發布package。
