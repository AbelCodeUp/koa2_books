"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _co = _interopRequireDefault(require("co"));

var _config = _interopRequireDefault(require("./config"));

var _log4js = require("log4js");

var _errorHandler = _interopRequireDefault(require("./middleware/errorHandler"));

var _containers = _interopRequireDefault(require("./containers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa.default();
app.use((0, _koaStatic.default)(_config.default.staticDir));
app.context.render = _co.default.wrap((0, _koaSwig.default)({
  root: _config.default.viewDir,
  autoescape: true,
  // cache: 'memory', // 缓存
  ext: 'html',
  writeBody: false
}));
(0, _log4js.configure)({
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
});
const logger = (0, _log4js.getLogger)('cheese');
app.use((0, _koaBody.default)({
  jsonLimit: '1kb'
}));

_errorHandler.default.error(app, logger);

(0, _containers.default)(app);
app.listen(_config.default.port, () => {
  console.log('Server Start');
});