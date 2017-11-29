/* eslint-disable camelcase,no-var */
require('babel-register');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new HtmlPlugin(),
    new ExtractTextPlugin('styles.css')
];

module.exports = {
    plugins: plugins,

    devServer: {
        port: 8887,
        contentBase: __dirname + '/public/'
    },

    entry: {
        app: __dirname + '/demo'
    },
    output: {
        path: __dirname + '/public/',
        filename: '[name].[hash].js',
        sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',

    resolve: {
        modules: [__dirname + '/../', 'node_modules'],
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|jpg|png|gif|ico)(\?(.*))?$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            }
        ]
    }
};
