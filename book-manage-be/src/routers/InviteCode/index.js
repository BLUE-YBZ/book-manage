const Router = require('@koa/router');
const mongoose = require('mongoose');
// const { getBody } = require("../../helpers/utils/index");
// const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const InviteCode = mongoose.model('InviteCode');
const router = new Router({
    prefix: '/invite',
});

router.get('/add', async(ctx) => {
    const code = new InviteCode({
        // uuidv4 生成邀请码
        code: uuidv4(),
        user:'',
    });
    const saved = await code.save();
    ctx.body = {
        code: 1,
        data: saved,
        msg: '创建成功'
    }
    console.log('这里执行到了');

});
// 注册路由
module.exports = router;