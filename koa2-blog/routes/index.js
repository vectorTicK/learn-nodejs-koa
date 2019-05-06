module.exports =  (router) => {
  router.get('/', async function (ctx, next) {
    ctx.state = {
      title: 'koa2 title'
    };

    await ctx.render('index', {
      title: ctx.state
    });
  });
  
  router.get('/welcome', async function (ctx, next) {
    ctx.state = {
      title: 'welcome to koa2'
    };

    await ctx.render('welcome', {title: ctx.state});
  })
}
