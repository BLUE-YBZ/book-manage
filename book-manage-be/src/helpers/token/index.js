const jwt = require('jsonwebtoken');
const config = require('../../project.config');
const koaJwt = require('koa-jwt');
// token 解密
const verify = (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token, config.JWT_SECRET,(err, payload) => {
            console.log(err, payload);
            if(err) {
                reject(err);
                return;
            }
            resolve(payload);
        });
    });
};

const getToken = (ctx) => {
    let { authorization } = ctx.header;
    
    return authorization.replace('Bearer','').replace('bearer','');
};
// koa new 出的实例 =》 app

const middleware = (app) => {
    // 将校验过程注册成中间件
    app.use(koaJwt({
        secret:config.JWT_SECRET,
        // unless 表示了哪些接口是不需要做校验的
    }).unless({
        path: [
            // 这两个接口还没有开始管理数据所以不需要进行校验
            /~\/auth\/login/, 
            /~\/auth\/register/, 
        ],
    }));
} ;
// koajwt 会在验证出错时，抛出错误
// 捕获下一个中间件的错误
const catchTokenError = async(ctx,next) => {
    // async 函数的返回是promise,因此可以借助promise的特性
    // 完成异常抛出
    return next().catch((error) => {
        if(error.status === 401 ){
            ctx.status = 401;
            ctx.body = {
                code:0,
                msg:'token error',
            };
        } else {
            throw error;
        }
    });
};


module.exports = {
    verify,
    getToken,
    middleware,
    catchTokenError
};