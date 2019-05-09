const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');

const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);

let webpackConfig = {

};

module.exports = merge(webpackConfig,_mergeConfig);