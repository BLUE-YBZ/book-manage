const Koa = require('koa')
// use 可以理解为是一个回调函数,注册中间件，每次有http请求进入时，就会进入这个中间件
// 中注册的回调函数，
const app = new Koa();
// http 请求涉及的参数  context => ctx
app.use((ctx) => {
    // console.log(ctx.URL);
    // console.log(ctx.path);
    // 解构赋值,const path = ctx.path,如果ctx 中没有path,会默认赋值为"/"
    const { path = "/" } = ctx;
    if (path === '/user/123') {
        ctx.body = "返回用户123的信息";
    } 
    if (path === '/settings') {
        ctx.body = '返回一些设置的信息';
    } 

});
app.listen(3000, () => {
    console.log('启动成功！');
})

