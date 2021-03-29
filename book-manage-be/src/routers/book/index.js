const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

const { getMate } = require('../../db/helpers');
const Book = mongoose.model('Book');
const router = new Router({
    prefix: '/book',
});

router.post('/add', async (ctx) => {
    // ctx 参数中既包含请求、也包含响应，post 传递数据时，请求体中有要传递的数据

    const {
        name,
        price,
        author,
        publishDate,
        classify,
    } = getBody(ctx);

    const book = new Book({
        name,
        price,
        author,
        publishDate,
        classify,
    });
    const res = await book.save();
    // 响应
    ctx.body = {
        data: res,
        code: 1,
        msg: '添加成功'
    }
});

router.get('/list', async (ctx) => {
    // 分页 
    // https://aa.cc.com/user?page=2&size=20#fsfa
    // query 就是page=2&size=20部分,会自动将这部分转换成对象，取出的属性值为字符串类型，# 后面是hash值。
    const {
        page = 1,
    } = ctx.query;
    // ??
    let = { size=10,}=ctx.query;
    size = Number(size);
    // mongoose提供的方法api,skip：跳过一部分;limit: 表示当前查询查几条,需要一个数值类型的值
    const list = await Book
        .find()
        .skip((page-1) * size)
        .limit(size)
        .exec();

    // 记录数据条数
    const total =await Book.countDocuments();
    ctx.body = {
        data: {
            total,
            list,
            page,
            size,
        },
        code: 1,
        msg: '获取列表成功',
    };

});
module.exports = router;