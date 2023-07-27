import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';

const ENTRYPOINTS_PATH = 'src/entrypoints';

const entries = fs.readdirSync(`./${ENTRYPOINTS_PATH}`).map(dir => [dir, `${ENTRYPOINTS_PATH}/${dir}/index.ts`]);

export default entries.map(([fileName, path]) => ({
  input: path,
  output: {
    format: 'cjs',
    file: `dist/${fileName}.js`
  },
  plugins: [commonjs(), typescript({module: 'ESNext'}), eslint(), terser()]
}));
