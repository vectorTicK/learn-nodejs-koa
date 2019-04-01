const Koa = require('koa');
const Router = require('koa-router');


const app = new Koa();
const router = require('./router.js');

router(app);

app.listen(8080, () => {
    console.log('Server is running at http://localhost:8080')
})
