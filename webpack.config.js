const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimize = true
  }

  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ]

  if (isProd) {
    // base.push(new BundleAnalyzerPlugin())
  }

  return base
}

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    filename: filename('js'),
    clean: true,
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['tsx', '.ts', '.js'],
  },
  optimization: optimization(),
  devServer: {
    hot: isDev,
    open: true,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: plugins(),
  module: {
    rules: [{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        loader: "ts-loader"
        // use: [
          // 'ts-loader'
          // {
          // loader: 'babel-loader',
          // options: {
          //   presets: [
          //     '@babel/preset-env',
          //     "@babel/preset-typescript"
          //   ],
          //   plugins: [
          //     [
          //       "@babel/plugin-transform-runtime",
          //       {
          //         "regenerator": true
          //       }
          //     ]
          //   ]
          // }
          // }
        // ],
      },
    ]
  }
}