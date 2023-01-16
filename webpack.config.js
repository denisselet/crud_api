import path from 'path';
import { fileURLToPath } from 'url';
import NodemonPlugin from 'nodemon-webpack-plugin';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config = {
  entry: './src/index.ts',
  context: dirname,
  output: {
    filename: 'main.cjs',
    path: path.resolve(dirname, 'dist')
  },
  target: 'node',
  resolve: {
    modules: [path.resolve(dirname, 'node_modules'), './node_modules'],
    fallback: {
      http: false,
      https: false,
      fs: false,
      path: false,
      os: false,
      stream: false,
      crypto: false,
      zlib: false,
      buffer: false,
      url: false,
      util: false,
      assert: false,
      constants: false,
      events: false,
      querystring: false
    }
  },
  module: {
    rules: [

    ]
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true
  },
  plugins: [
    new NodemonPlugin({
      script: 'ts-node-esm src/index.ts',
      ext: 'mts'
    })
  ],
  devServer: {
    static: {
      directory: path.join(dirname, 'src')
    },
    compress: true,
    port: 9000
  }
};

export default config;
