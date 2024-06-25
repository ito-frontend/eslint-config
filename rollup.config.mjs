import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    json(),
    terser()
  ],
  external: [
    '@antfu/eslint-config',
    'eslint-plugin-simple-import-sort',
    'eslint-plugin-tailwindcss',
    'eslint-plugin-vue',
  ],
};
