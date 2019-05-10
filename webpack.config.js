const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');

const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const glob = require('glob');
const files = glob.sync('./src/web/views/**/*.entry.js');

console.log('输出-->',files);

for (const item of files) {
    if( /.\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true ){
        console.log(RegExp.$1);
    }
}

let _entry = {};

let webpackConfig = {
    entry:_entry,
};

module.exports = merge(webpackConfig,_mergeConfig);