const HomeService = require('../service/home');
module.exports = {
    index: async (ctx, next) => {
        ctx.body = '<h1>index page</h1>';
    },
    home: async (ctx, next) => {
        ctx.body = '<h1>home page</h1>'
    },
    user: async (ctx, next) => {
        await ctx.render('home/login', {
            btnName: 'login'
        });
        
    },
    login: async (ctx, next) => {
        let {name, password} = ctx.request.body;
        let data = await HomeService.login(name, password);
        ctx.body = data;
    }

}