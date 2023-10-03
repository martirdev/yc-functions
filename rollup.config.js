import eslint from '@rollup/plugin-eslint';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import cp from 'vite-plugin-cp';
import Compression from "unplugin-compression/vite";

const ENTRYPOINTS_PATH = 'src/entrypoints';

const entries = fs.readdirSync(`./${ENTRYPOINTS_PATH}`).map(dir => [dir, `${ENTRYPOINTS_PATH}/${dir}/index.ts`]);

export default entries.map(([fileName, path]) => ({
  input: path,
  output: {
    format: 'es',
    file: `dist/${fileName}/index.js`
  },
  plugins: [
    typescript({module: 'ESNext'}),
    eslint(),
    terser(),
    cp({
      targets: [{src: 'package.json', dest: `dist/${fileName}`},{src: 'package-lock.json', dest: `dist/${fileName}`}]
    }),
    Compression({
      adapter: "zip",
      source: `dist/${fileName}`,
      outDir: `dist/${fileName}`,
      formatter: "{{name}}.{{ext}}",
    }),
  ]
}));
