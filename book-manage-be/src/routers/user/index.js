const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');

const User = mongoose.model('User');
const Character = mongoose.model('Character');
const router = new Router({
    prefix: '/user',
});
// 获取用户列表
router.get('/list', async (ctx) => {
    let {
        // 这里解构的结果是也是字符串，需要转成数字避免出现错误
        page,
        size,
        keyword,
    } = ctx.query;
    page = Number(page);
    size = Number(size);
    const query = {};
    if(keyword) {
        query.account = keyword;
    }
    const list = await User
        .find(query)
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size) //拿出size条记录
        .exec();

    const total = await User.countDocuments().exec();
    ctx.body = {
        msg: '获取列表成功',
        data: {
            list,
            page,
            size,
            total
        },
        code: 1,
    };


});
// 删除用户信息
router.delete('/:id', async (ctx) => {
    const {
        id,
    } = ctx.params;
    const delMsg = await User.deleteOne({
        _id: id,
    });

    ctx.body = {
        data: delMsg,
        code: 1,
        msg: '删除成功'
    };
});
// 添加用户
router.post('/add', async (ctx) => {
    const {
        account,
        password = '123456',
        character,
    } = ctx.request.body;

    const user = new User({
        account,
        password,
        character
    });
    const char = await Character.findOne({
        _id: character,
    });
    if(!char) {
        ctx.body = {
            msg: '出错了！',
            code: 0,
        };
        return;
    }
    const res = await user.save();
    ctx.body = {
        data: res,
        code: 1,
        msg: '添加成功',
    }
});
//  重置密码
router.post('/reset/password', async (ctx) => {
    const {
        id,
    } = ctx.request.body;
    const user = await User.findOne({
        _id: id,
    }).exec();
    if (!user) {
        ctx.body = {
            msg: "找不到用户",
            code: 0,
        };
        return;
    };
    // 设置重置密码默认值
    user.password = config.DERAULT_PASSWORD;
    const res = await user.save();
    ctx.body = {
        msg: '修改成功',
        data: {
            account: res.account,
            _id: res._id,
        },
        code: 1,
    };
});
// 
router.post('/update/character',async (ctx) => {
    const {
        character,
        userid,
    } = ctx.request.body;
    // 分别查询了 角色集合和用户集合
    const char = await Character.findOne({
        _id: character,
    }).exec();
    if(!char) {
        ctx.body = {
            msg: '出错了',
            code: 0,
        };
        return;
    };
    const user = await User.findOne({
        _id: userid,
    }).exec();
    if(!user) {
        ctx.body = {
            msg: '出错了',
            code: 0,
        };
        return;
    };
    user.character = character;
    const res = await user.save();
    ctx.body = {
        data: res,
        code: 1,
        msg: '修改成功',
    };

});
module.exports = router;
