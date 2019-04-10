const route = require('koa-route');
const koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const views = require('koa-views');
const koaBody = require('koa-body');

const table = require('./containers/bookContainers');
const errorHandler = require('./middleware/errorHandler');

const app = module.exports = new koa();

app.use(koaBody({
    jsonLimit: '1kb'
}));
app.use(serve(path.join(__dirname, '/public')));
app.use(views(path.join(__dirname, '/views'), {
    map: {
        html: 'swig'
    }
}));
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

app.on('error', errorHandler );
app.use(route.get('/', table.index));
app.use(route.get('/insert', table.insert));
app.use(route.post('/create', table.create));
app.use(route.get('/detail/:id', table.detail));
app.use(route.get('/update/:id', table.updateRender));
app.use(route.post('/update', table.update));
app.use(route.post('/delete', table.delete));
app.use(async (ctx, next) => {
    await ctx.render('404', {
      title: 'page not find'
    })
});



app.listen(3001, () => {
    console.log('Server Start');
})