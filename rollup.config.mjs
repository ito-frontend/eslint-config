import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: './src/index.js',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.js',
      format: 'esm',
    },
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    json(),
    terser(),
  ],
  external: [
    '@antfu/eslint-config',
    'eslint-plugin-simple-import-sort',
    'eslint-plugin-tailwindcss',
  ],
};
