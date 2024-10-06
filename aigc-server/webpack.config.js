const path = require('path');
const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');
const MinifyPlugin = require('babel-minify-webpack-plugin');
module.exports = {
    mode: 'production',
  entry: './app.js',  // 您的 Koa 项目入口文件
  output: {
    path: path.resolve(__dirname, './dist'), // 输出路径
    filename: 'app.js' // 输出项目根目录
  },
  target: 'node',//服务端打包
  externals: [nodeExternals()], // 忽略 node_modules 里的依赖
  node: {
    __dirname: true,   // 保留这些合法属性
    __filename: true,
    global: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader' // 如果需要使用 ES6 或者更高版本的 JS
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname) // 假设 'src' 是根目录下的源码目录
    }
  },
  plugins: [
   
    new MinifyPlugin() // 压缩js
  ]

};
