const Koa = require('koa');
// use 可以理解为是一个回调函数,注册中间件，每次有http请求进入时，就会进入这个中间件
// 中注册的回调函数，
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const { connect } = require('./db');
const registerRoutes = require('./routers/index');
const { middleware: koaJwtMiddleware,catchTokenError } = require('./helpers/token'); 

const app = new Koa();
connect().then(() => {
    // 解决跨域问题
    app.use(cors());
    // 确保请求在连接成功后执行，避免漏掉请求
    app.use(koaBody());
    app.use(catchTokenError);// 在koaJwt之前
    koaJwtMiddleware(app);
    registerRoutes(app);
    
    // 开启一个 http 服务
    // 接受 http 请求并处理，处理完后响应
    app.listen(3000, () => {
        console.log('服务启动成功！');
    })

});




