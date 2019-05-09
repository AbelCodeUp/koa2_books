"use strict";

const errorHandler = {
  error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        logger.error(err);
        ctx.status = 500;
        ctx.body = render(505);
      }
    });
    app.use(async (ctx, next) => {
      await next();

      if (404 != ctx.status) {
        return;
      }

      logger.error(ctx.status);
      ctx.status = 404;
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
    });
  }

};
module.exports = errorHandler;