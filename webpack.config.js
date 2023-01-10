const path = require('path');
const MiniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlagin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  entry: './src/index.jsx',
  cache: {
    type: 'memory'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, 'public'),
    assetModuleFilename: 'chats/img/[name][ext]'
  },
  optimization: {
    nodeEnv: 'production',
    minimize: true,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/[name]'),
    },
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        test: /\.css$/,
        use: [MiniCss.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCss({
      filename: './style/[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlagin({
      template: './src/index.html',
      filename: 'index.html',
      excludeChunks: ['server'],
      title: 'Caching'
    }),
    new CompressionPlugin()
  ],
  devServer: {
    port: 8080,
    // historyApiFallback: true,
    compress: true,
    static: {
      directory: path.join(__dirname, 'public'),
      watch: false,
      staticOptions: {
        immutable: true,
        maxAge: 60000,
        cacheControl: true, 
        headers: {
          "Cache-Control": "max-age=60000"
        }
      }
    },
    // hot: true,
    open: false,
    // proxy: {
    //   '/api': {
    //     target: "http://localhost:3000/",
    //     pathRewrite: { '/^api': ''},
    //     secure: false,
    //     changeOrigin: true
    //   }
    // }
  }
}
