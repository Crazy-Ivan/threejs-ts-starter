const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')


module.exports = {
    entry: path.resolve(__dirname, '../src/index.ts'),
    output:
    {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].[contenthash].js',
        sourceMapFilename: '[name].[contenthash].map',
        chunkFilename: '[id].[chunkhash].js'
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    globOptions: {
                        ignore: [path.resolve(__dirname, '../public/index.html')],
                    },
                },
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            minify: true
        }),
        new MiniCSSExtractPlugin()
    ],
    resolve: {
        modules: [
            'src',
            'node_modules'],
        extensions: ['.ts', '.js'],


    },
    module:
    {
        rules:
        [


            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },
            // JS
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use:
                    [
                        'ts-loader'
                    ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            }
        ]
    }
}
