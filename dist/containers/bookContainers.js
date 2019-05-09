"use strict";

const book = require('../models/book');

const FormData = require('form-data');

class bookController {
  constructor() {}

  actionIndex() {
    return async ctx => {
      let data = await book.getBookList();
      ctx.body = await ctx.render('index', {
        books: data.data.message,
        title: '图书管理系统'
      });
    };
  }

  actionInsert() {
    return async ctx => {
      ctx.body = await ctx.render('insert');
    };
  }

  actionCreate() {
    return async ctx => {
      let req = ctx.request.body;
      const params = this.filterFormData(req);
      let msg = await book.createBook(params);
      ctx.body = msg;
    };
  }

  actionDetail() {
    return async (ctx, id) => {
      let data = await book.getBookInfo({
        id
      });
      ctx.body = await ctx.render('detail', {
        book: data.data.message
      });
    };
  }

  actionUpdateRender() {
    return async (ctx, id) => {
      let data = await book.getBookInfo({
        id
      });
      ctx.body = await ctx.render('update', {
        book: data.data.message
      });
    };
  }

  actionUpdate() {
    return async ctx => {
      let req = ctx.request.body;
      const params = this.filterFormData(req);
      let msg = await book.updateBook(params);
      ctx.body = msg;
    };
  }

  actionDelete() {
    return async ctx => {
      let req = ctx.request.body;
      let msg = await book.deleteBook(req);
      ctx.body = msg;
    };
  }

  filterFormData(data) {
    const params = new FormData();

    for (const key in data) {
      params.append(key, data[key]);
    }

    return params;
  }

}

module.exports = bookController;