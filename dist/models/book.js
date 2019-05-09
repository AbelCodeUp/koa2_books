"use strict";

const SafeRequest = require('../utils/SafeRequest');

class Books {
  constructor() {}

  getBookList(options) {
    const safeRequest = new SafeRequest('book/index');
    return safeRequest.fetch();
  }

  getBookInfo(params) {
    const safeRequest = new SafeRequest('book/detail');
    return safeRequest.fetch({
      method: 'GET',
      params: params
    });
  }

  createBook(params) {
    const safeRequest = new SafeRequest('book/insert');
    return safeRequest.fetch({
      method: 'POST',
      params: params
    });
  }

  updateBook(params) {
    const safeRequest = new SafeRequest('book/update');
    return safeRequest.fetch({
      method: 'POST',
      params: params
    });
  }

  deleteBook(params) {
    const safeRequest = new SafeRequest('book/delete');
    return safeRequest.fetch({
      method: 'GET',
      params: params
    });
  }

}

module.exports = new Books();