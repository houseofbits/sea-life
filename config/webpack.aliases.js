const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@js': path.resolve(__dirname, '../app/js'),
            '@images': path.resolve(__dirname, '../app/images'),
            '@json': path.resolve(__dirname, '../app/json'),
            '@style': path.resolve(__dirname, '../app/style'),
        }
    }
};