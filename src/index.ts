import { antfu, type TypedFlatConfigItem } from '@antfu/eslint-config';

import { getAntfuConfig } from './configs/antfu';
import { getCustomConfigArr } from './configs/custom';

type ItoConfigOptions = {
  /**
   * 使用的框架，'vue' 或 'react'，預設為 'vue'
   * type: 'vue' | 'react'
   * default: 'vue'
   */
  framework?: 'vue' | 'react';
  /**
   * Vue 版本，2 或 3，預設為 3
   * type: 2 | 3
   * default: 3
   */
  vueVersion?: 2 | 3;
  /**
   * 是否使用 Tailwind CSS，預設為 false
   * type: boolean
   * default: false
   */
  tailwind?: boolean;
  /**
   * 其他自訂義的配置
   * type: TypedFlatConfigItem[]
   * default: []
   */
  otherConfigs?: TypedFlatConfigItem[];
};

function itoConfigFactory(options?: ItoConfigOptions) {
  const { framework = 'vue', vueVersion = 3, tailwind = false, otherConfigs = [] } = options || {};

  const antfuConfigObj = getAntfuConfig({ framework, vueVersion });
  const customConfigArr = getCustomConfigArr({ tailwind, otherConfigs });

  return antfu(
    antfuConfigObj,

    ...customConfigArr,
  );
}

export default itoConfigFactory;
