const koa = require('koa');
const app = new koa();

const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();

router
    .get('/', (ctx, next) => {
        console.log(ctx.request.query);
        console.log(ctx.request.querystring);
        ctx.body = 'get';
    })
    .get('/:id/:name', async (ctx, next) => {
        console.log(ctx.params);
        let html = `<h1>HOME page ${ctx.params.id}, ${ctx.params.name}</h1>`;
        ctx.body = html;
    })
    .get('/users/:id', async (ctx, next) => {
        ctx.body = 'put';
        await next();
    })
    .get('/users/:id', async (ctx, next) => {
        ctx.body = 'delete';
    });


app.use(router.routes());
app.listen(8080, () => {
console.log('router server is running ');
});