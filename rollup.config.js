/**
* @file 头部注释
* @author bigcui
* 2020-10-12
*/
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
export default {
    input: 'src/main.js',
    output: {
        file: 'dist/importHtml.min.js',
        format: 'umd',
        moduleName: 'importHtml',
        name: 'importHtml',
        sourcemap: true
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
};
