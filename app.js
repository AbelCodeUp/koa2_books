const koa = require('koa');
const serve = require('koa-static');
const koaBody = require('koa-body');
const render = require('koa-swig');
const co = require('co');
const config = require('./config');
const {
    configure,
    getLogger
} = require('log4js');
const errorHandler = require('./middleware/errorHandler');

const app = new koa();
app.use(serve(config.staticDir));

app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    // cache: 'memory', // 缓存
    ext: 'html',
    writeBody: false,
}));

configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'logs/book.log'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'error'
        }
    }
})
const logger = getLogger('cheese');
app.use(koaBody({
    jsonLimit: '1kb'
}));
errorHandler.error(app, logger);
require('./containers')(app);
app.listen(config.port, () => {
    console.log('Server Start');
})