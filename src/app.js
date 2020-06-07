import Koa from 'koa';
const router = require('./routes');

const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
