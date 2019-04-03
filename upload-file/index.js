const Koa = require('koa');
const multer = require('koa-multer');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();
const upload = multer({dest: './upload-file/uploads/'});

const types = upload.single('avatar'); //

router.get('/', async (ctx, next) => {
    ctx.response.body = '<!DOCTYPE html> <' +
        'html lang = "en" >' +
        '<head><meta charset = "UTF-8" >' +
        '<meta name = "viewport" content = "width=device-width, initial-scale=1.0" >' +
        '<meta http - equiv = "X-UA-Compatible"  content = "ie=edge" >' +
        '<title> Document </title> </head> <body>' +
        '<form action = "/" method = "POST" enctype = "multipart/form-data">' +
       ' 选择图片： <input type = "file" name = "avatar" id = "upfile">' +
        '<input type = "submit" value = "提交" ></form> </body> </html>';
})
router.post('/', types, async (ctx, next) => {
    const {
        originalname,
        path: out_path,
        mimetype
    } = ctx.req.file;
    let newName = out_path + path.parse(originalname).ext;
    let err = fs.renameSync(out_path, newName);
    let result ;
    if(err) {
        result = JSON.stringify(err);
    } else {
        result = '<h1>upload success</h1>';
    }
    ctx.response.body = result;
}); //
app.use(router.routes());
app.listen(3000, ()=>{
    console.log('server is running at http://localhost:3000');
});
