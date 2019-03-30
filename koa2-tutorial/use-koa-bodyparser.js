const koa = require('koa');

const app = new koa();
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        ctx.type = 'html';
        let html = `<h1>login</h1>
            <form action = "/"  method = "POST">
                <p> username </p> <input type = "text" name = "userName"> <br>
                <p> password </p> <input type = "password" name = "password"><br><button type = "submit"> submit </button> </form>`;
        ctx.body = html;
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        let postData = ctx.request.body
        ctx.body = postData;
    }
});
app.listen(8080);