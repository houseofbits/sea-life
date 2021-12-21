const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
            '@js': path.resolve(__dirname, '../app/js'),
            '@images': path.resolve(__dirname, '../app/images'),
            '@json': path.resolve(__dirname, '../app/json'),
            '@style': path.resolve(__dirname, '../app/style'),
            '@content': path.resolve(__dirname, '../app/content'),
        }
    }
};