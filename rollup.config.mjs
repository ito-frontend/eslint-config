import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      nodeResolve(), // Locate and bundle dependencies in node_modules
      json(), // Convert JSON files to ES6
      // terser(), // Minify the bundle
    ],
    external: [
      '@antfu/eslint-config',
      'eslint-plugin-simple-import-sort',
      'eslint-plugin-tailwindcss',
    ],
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED')
        return;
      warn(warning); // this requires Rollup 0.46
    },
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];

export default config;
