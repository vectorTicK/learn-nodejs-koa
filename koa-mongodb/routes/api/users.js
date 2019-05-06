// 实例化koa-router
const Router = require("koa-router");
const router = new Router();

const jwt = require("jsonwebtoken");
const tokenKey = require("../../config/key");

const passport = require("koa-passport");
// 引入密码加密模块
const tools = require('../../config/tools');

// 引入User数据模型
const User = require("../../models/User");

// 引入全球公认头像
const gravatar = require("gravatar");


/**
 * @route GET api/users/test
 * @description 测试接口地址
 * @access public
 */
router.get("/test", async ctx => {
    ctx.body = {msg: 'users works..'};
});

/**
 * @route POST api/users/register
 * @description 注册接口地址
 * @access public
 */
router.post("/register", async ctx => {
    ctx.body = ctx.request.body;
    let registerBody = ctx.request.body;
    // 检查用户是否已存在
    const findResutl = await User.find({email: ctx.request.body.email});
    console.log(findResutl);
    if( findResutl.length > 0){
        ctx.status = 500;
        ctx.body = {email: 'email exist'};
    }else {
        let avatar = gravatar.url(registerBody.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        const newUser = new User({
            name: registerBody.name,
            email: registerBody.email,
            password: tools.enBcrypt(registerBody.password), // 加密密码
            avatar: avatar
        });

        // 存储到数据库
        await newUser.save().then((user) => {
            ctx.body = user;
        }).catch((err) => {
            ctx.body = err;
        });
    }
});

/**
 * @route POST api/users/login
 * @description 登录接口地址 返回token
 * @access public
 */
router.post('/login', async ctx => {
    let loginData = ctx.request.body;
    // 查询
    let findResutl = await User.find({ email: loginData.email});

    if( findResutl.length === 0) {
        ctx.status = 404;
        ctx.body = {
            failed: '用户不存在'
        };
    }else {
        let user = findResutl[0];
        // 查到后验证
        let result = tools.comparePassword(loginData.password, user.password);
        if(result){
            // 验证成功，返回token
            let payload = {id: user.id, name: user.name, avatar:user.avatar};
            let token = jwt.sign(payload, tokenKey.secretKey, {expiresIn:3600});
            ctx.body = {success:'验证成功', token:'Bearer '+token};
        }else{
            ctx.body = {failed:'密码不正确'};
        }
    }
});

/**
 * @route GET api/users/current
 * @description token
 * @access public
 */
router.get("/current", passport.authenticate('jwt', {
            session: false
        }), async ctx => {
    ctx.body = {
        id: ctx.state.user.id,
        name: ctx.state.user.name,
        email: ctx.state.user.email,
        avatar: ctx.state.user.avatar
    };
});


module.exports = router.routes();