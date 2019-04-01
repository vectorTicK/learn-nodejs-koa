const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');


module.exports = (app) => {
    router.get('/', async (ctx, next) => {
        ctx.body = '<h1>index page</h1>'
    });
    router.get('/home', async (ctx, next) => {
        ctx.body = '<h1>home page</h1>'
    });
    router.get('/user', async (ctx, next) => {
        ctx.body = `<form action="/user/login" method="POST">
        <input type="text" name="name" placeholder="请输入用户名">
        <input type="password" name="password" placeholder="请输入密码">
        <button>gogogo</button>
    </form>`;
    });
    router.post('/user/login', async(ctx, next) => {
        app.use(bodyParser());
        let {name, password} = ctx.request.body;
        ctx.body = `hello, ${name}`;
    });
    app.use(router.routes()).use(router.allowedMethods());
}