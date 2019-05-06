const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const passport = require("koa-passport");
// 实例化koa
const app = new Koa();
const router = new Router();
app.use(bodyParser());




// 路由
router.get("/", async ctx => {
    ctx.body = {msg: "Hello Koa Interface"};
});

// 配置路由地址
const user = require("./routes/api/users");
router.use("/api/user", user);

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 连接数据库

// 引入配置文件
const dbURI = require("./config/key").mongodbURI;

mongoose.connect(dbURI, {useNewUrlParser: true})
.then(() => {
    console.log("Mongodb connected...");
})
.catch((err) => {
    console.log("Mongodb connect failed:" + err);
})

app.use(passport.initialize());
app.use(passport.session());

// 回调到config文件
require("./config/passport")(passport);

//  监听端口
const port = process.env.port || 5000;

app.listen(port, () => {
    console.log("sever is running on http://localhost:5000");
});