console.log("hello world");

const koa = require('koa');
const app = new koa();

// app.use( async (ctx, next) =>{
//     await next();
//     ctx.response.type = "text/html";
//     ctx.response.body = '<h1>Hello World</h1>';
// });

// app.use(async (ctx) => {
//     ctx.response.body = {
//         url: ctx.request.url,
//         query: ctx.request.query,
//         querystring: ctx.request.querystring
//     };
//     console.log(ctx.request.query['keywords']);
// })

// const logger = async function(ctx1, next) {
//     console.log(ctx1.method, ctx1.host + ctx1.url);
//     await next();
// }

// app.use(logger);
// app.use(async (ctx, next) =>{
//     ctx.body = 'hello world';
// });

// app.use(async (ctx, next) => {
//     console.log('one start');
//     await next();
//     console.log('one end');
// });
// app.use(async (ctx, next) => {
//     console.log('two start');
//     ctx.body = 'two';
//     await next();
//     console.log('two end');
// });
// app.use(async (ctx, next) => {
//     console.log('three start');
//     await next();
//     console.log('three end');
// });


// app.use(async (ctx, next) => {
//     let stime = new Date().getTime();
//     await next();
//     let etime = new Date().getTime();
//     ctx.response.type = 'text/html';
//     let str = `<h1>request url: ${ctx.path}, <br>response time: ${etime - stime}ms</h1>`;
//     ctx.response.body = str;
//     console.log(etime-stime);
//     console.log(`response time: ${etime-stime} ms`);                         
// });
app.listen(8080, () => {
    console.log('server is running at http://localhost:8080');
});

