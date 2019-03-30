const {
    sign
} = require('jsonwebtoken');
const secret = 'demo';

const jwt = require('koa-jwt')({
    secret
});

const koa = require('koa');
const app = new koa();

const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();

router
    .get('/api/login', async (ctx, next) => {
        const user = ctx.request.body;
        if (user && user.username) {
            let {
                username
            } = user;
            const token = sign({
                username
            }, secret, {
                expiresIn: '1h'
            });
            ctx.body = {
                message: 'get token success',
                code: 1,
                token
            };
        } else {
            ctx.body = {
                message: 'Para Error',
                code: -1
            }
        }
    })
    .get('/api/userinfo', jwt, async ctx => {
        ctx.body = {username: ctx.state.user.username};
    });
    // .get('/api/admininfo', jwt, admin, async ctx => {
    //     ctx.body = {
    //         username: ctx.state.user.username
    //     };
    // })
    app.use(router.routes());
    app.listen(8080, () => {
        console.log('router server is running ');
    });