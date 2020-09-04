const path = require('path');

module.exports = {
    entry: {
        'index': './src/js/index.js',
        'subscription-confirmation': './src/js/subscription-confirmation.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/preset-env']
            }
        }]
    },
    mode: 'production'
};