const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const path = require('path');


const app = new Koa();
const router = require('./router.js');
app.use(bodyParser());
app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true
    }
}));
router(app);

app.listen(8080, () => {
    console.log('Server is running at http://localhost:8080')
})
