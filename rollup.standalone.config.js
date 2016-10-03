import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/index.js',
  format: 'iife',
  useStrict: false,
  moduleName: 'logicRunner',
  plugins: [
    commonjs(),
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'stage-2'],
    }),
    nodeResolve({jsnext: true, main: true}),
  ],
  dest: 'dist/logicRunner.js'
};
