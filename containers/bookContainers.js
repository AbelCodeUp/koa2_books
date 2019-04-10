const book = require('../models/book');
const table = {
    index: async (ctx) => {
        let data = await book.getBookList();
        await ctx.render('index', {
            books: data,
            title: '图书管理系统'
        });
    },
    insert: async (ctx) => {
        await ctx.render('insert');
    },
    create: async (ctx) => {
        let req = ctx.request.body;
        let msg = await book.createBook(req);
        ctx.body = msg;
    },
    detail: async (ctx, id) => {
        let data = await book.getBookInfo(id);
        await ctx.render('detail', {
            book: data,
        });
    },
    updateRender: async (ctx,id) => {
        let data = await book.getBookInfo(id);
        await ctx.render('update', {
            book: data,
        });
    },
    update:async(ctx)=>{
        let req = ctx.request.body;
        let msg = await book.updateBook(req);
        ctx.body = msg;
    },
    delete:async(ctx)=>{
        let req = ctx.request.body;
        let msg = await book.deleteBook(req);
        ctx.body = msg;
    }
}
module.exports = table;