const path = require('path');

module.exports = {
    entry: {
        'main': './app/js/main.ts',
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, '../dist/'),
    },
};