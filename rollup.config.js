import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  useStrict: false,
  plugins: [
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'stage-2'],
    }),
  ],
  dest: 'dist/bundle.js',
};
