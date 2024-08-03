const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    mode: 'development',
    entry: {
        index: './src/button.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'widget',
            filename: 'remoteEntry.js',
            exposes: {
                './button': './src/button.js',
            },
            shared: ['lodash'],
            runtime: 'widget-runtime',
        })
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: 'http://localhost:8081/',
    },
    optimization: {
        runtimeChunk: 'single',
    }
};
