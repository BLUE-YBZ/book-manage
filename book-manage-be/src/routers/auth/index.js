const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');
const jwt = require('jsonwebtoken');
const config = require('../../project.config')

const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');
const router = new Router({
    prefix: '/auth',
});

// 这个函数在被处理后，可以看作是中间件进行注册，
// 因此可以获得ctx,实际上router匹配到路由调用时传递给我们的
router.post('/register', async (ctx) => {
    const {
        account,
        password,
        inviteCode,
    } = getBody(ctx);
    // 做表单校验，注册时必然得有账户和密码
    if (account === "" || password == "" || inviteCode === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        };
        return;
    }
    // 有非重复的邀请码才有注册的资格
    // .exec() 执行
    const findCode = await InviteCode.findOne({
        code: 'inviteCode'
    }).exec();
    if (!findCode || findCode.user) {
        ctx.body = {
            code: 0,
            msg: '邀请码不正确',
            data: null,
        };
        return;
    }

    const findeUser = await User.findOne({
        account,
    }).exec();
    if (findeUser) {
        ctx.body = {
            code: 0,
            msg: '已存在该用户',
            data: null,
        };
        return;
    }
    // 创建一个用户
    const user = new User({
        account,
        password,
    });
    // 把创建的用户同步到 mongodb
    const res = await user.save();
    // 将注册的新用户的id,放到invitecode表中
    findCode.user = res._id;
    findCode.meta.updateAt = new Date().getTime();
    
    await findCode.save();
    // 响应成功
    ctx.body = {
        code: 1,
        msg: '注册成功',
        data: res,
    };
});

router.post('/login', async (ctx) => {
    console.log(ctx);
    const {
        account,
        password,
    } = getBody(ctx);
    // user.findeone 返回的是一个promise
    const one =await User.findOne({
        account,
    }).exec();
    // 账户错误或不存在
    if (!one) {
        ctx.body = {
            code: 0,
            msg: '用户名或密码错误',
            data: null,
        };
        return;
    };

    const user = {
        account: one.account,
        // 区别不同权限,返回给前端的数据
        character: one.character,
        _id: one._id,
    };
    // 密码
    if (one.password === password) {
        ctx.body = {
            code: 1,
            msg: '登入成功',
            data: {
                user,
                // 密码不要放在传递数据处
                token: jwt.sign(user,config.JWT_SECRET),
            },
        };
        return;
    }
    // 密码不正确
    ctx.body = {
        code: 0,
        msg: '用户名或密码错误',
        data: null,
    };
});
module.exports = router;