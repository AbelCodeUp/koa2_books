"use strict";

const route = require('koa-route');

const bookContainer = require('./bookContainers');

const Index = new bookContainer();

module.exports = app => {
  app.use(route.get('/', Index.actionIndex()));
  app.use(route.get('/insert', Index.actionInsert()));
  app.use(route.post('/create', Index.actionCreate()));
  app.use(route.get('/detail/:id', Index.actionDetail()));
  app.use(route.get('/update/:id', Index.actionUpdateRender()));
  app.use(route.post('/update', Index.actionUpdate()));
  app.use(route.post('/delete', Index.actionDelete()));
};