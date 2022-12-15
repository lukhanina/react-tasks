const path = require('path');
const MiniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlagin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public'),
        assetModuleFilename: 'img/[name][ext]'
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components/[name]'),
        },
        extensions: ['.js', '.jsx'],
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
                    plugins: [
                        ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        ["@babel/plugin-proposal-private-methods", { "loose": true }],
                        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [MiniCss.loader, 'css-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
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
            excludeChunks: ['server']
        })
    ],
    mode: 'development',
    devServer: {
        // static: {
        //     directory: path.join(__dirname, 'public'),
        // },
        port: 8080,
        // hot: true,
        open: false,
        proxy: {
            '/api': {
                target: "http://localhost:3000/",
                pathRewrite: { '/^api': ''},
                secure: false,
                changeOrigin: true
            }
        }
    }
}