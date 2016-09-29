import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/index.js',
  format: 'iife',
  moduleName: 'logicRunner',
  plugins: [
    babel({
      babelrc: false,
    }),
    nodeResolve({jsnext: true, main: true}),
    commonjs(),
  ],
  dest: 'dist/logic.js'
};
