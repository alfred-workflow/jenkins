import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default [
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: './src/index.ts',
        plugins: [typescript(), json(), commonjs(), resolve()],
        output: [
            {file: 'dist/index.js', format: 'cjs'}
        ]
    },
    {
        input: './src/build-action.ts',
        plugins: [typescript(), json(), commonjs(), resolve()],
        output: [
            {file: 'dist/build-action.js', format: 'cjs'}
        ]
    }
];