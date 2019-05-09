import koa from'koa';
import serve from'koa-static';
import koaBody from'koa-body';
import render from'koa-swig';
import co from'co';
import config from'./config';
import {
    configure,
    getLogger
} from'log4js';
import errorHandler from './middleware/errorHandler';
import containers from './containers';
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
containers(app);

app.listen(config.port, () => {
    console.log('Server Start');
})