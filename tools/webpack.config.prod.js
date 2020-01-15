const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: './example/src/index.tsx',

  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js(x?)|ts(x?))$/,
        use: [
          // tsc编译后，再用babel处理
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader",
            options: {
              // 加快编译速度
              transpileOnly: true,
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, "../tsconfig.json")
            }
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.(css|sass|scss)$/,
        rules: [
          {
            loader: "style-loader"
          },

          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2, // 在 css-loader 前应用的 loader 的数量
              modules: {
                localIdentName: '[name]-[local]-[hash:base64:5]', // 配置生成的标识符
              },
            }
          },

          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({})
              ]
            }
          },

          {
            test: /\.(scss|sass)$/,
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, '../src/style')],
              },
              sourceMap: true,
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      template: "example/index.html",
      // 使用的是该插件内部集成的HTMLMinifier
      minify: {
        // 是对html文件进行压缩
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true // 去掉属性的双引号
      },
      hash: true, // 为了开发中js有缓存效果，所以加入hash,这样可以有效避免缓存js
      favicon: "example/favicon.ico"
    }),
    new cleanWebpackPlugin(),
  ],
};