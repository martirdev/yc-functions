import eslint from '@rollup/plugin-eslint';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import ZipPack from 'unplugin-zip-pack/vite';
import cleanPlugin from 'vite-plugin-clean';
import cp from 'vite-plugin-cp';

const ENTRYPOINTS_PATH = 'src/entrypoints';

const makePathToIndex = name => `${ENTRYPOINTS_PATH}/${name}/index.ts`;

if (!process.env.package) {
  throw new Error('package not specified, pass argument package:PACKAGE_NAME');
}

const fileName = process.env.package;
const path = makePathToIndex(fileName);

if (!fs.existsSync(path)) {
  throw new Error(`Package doesn't have index.ts file (path="${path}")`);
}

const pathToDir = `dist/${fileName}`;

export default {
  input: path,
  output: {
    format: 'es',
    file: `${pathToDir}/index.js`
  },
  plugins: [
    cleanPlugin({
      targetFiles: pathToDir
    }),
    typescript({module: 'ESNext'}),
    eslint(),
    terser(),
    cp({
      targets: [
        {src: 'package.json', dest: `dist/${fileName}`},
        {src: 'package-lock.json', dest: `dist/${fileName}`}
      ]
    }),
    ZipPack({
      in: pathToDir,
      out: `${pathToDir}/${fileName}.zip`
    })
  ]
};
