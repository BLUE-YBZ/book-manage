const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

const { getMate } = require('../../db/helpers');
const Book = mongoose.model('Book');
const router = new Router({
    prefix: '/book',
});
const BOOK_CONST = {
    IN: 'IN_COUNT',
    OUT: `OUT_COUNT`,
}

router.post('/add', async (ctx) => {
    // ctx 参数中既包含请求、也包含响应，post 传递数据时，请求体中有要传递的数据

    const {
        name,
        price,
        author,
        publishDate,
        classify,
        count,
    } = getBody(ctx);

    const book = new Book({
        name,
        price,
        author,
        publishDate,
        classify,
        count,
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
    // https://aa.cc.com/user?page=2&size=20&keywords#fsfa
    // query 就是page=2&size=20部分,会自动将这部分转换成对象，取出的属性值为字符串类型，# 后面是hash值。
    const {
        page = 1,
        keyword="",
    } = ctx.query;
    // ??
    let = { size=10,}=ctx.query;
    size = Number(size);
    const query = {};
    // 避免查询时出现查询 keyword 为空时的内容
    if (keyword) {
        query.name = keyword;
    }
    // mongoose提供的方法api,skip：跳过一部分;limit: 表示当前查询查几条,需要一个数值类型的值
    const list = await Book
        .find(query)
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

// method DELETE
// PATH /book/:id
router.delete('/:id', async(ctx) => {
    const {
        id,
    } = ctx.params;
    const delMsg = await Book.deleteOne({
        _id:id,
    });
    ctx.body = {
        data: delMsg,
        msg: '删除成功',
        code: 1,
    }
});
// 入库和出库 
router.post('/update/count', async(ctx) => {
    const {
        id,
        type,
    } = ctx.request.body;

    let {
        num,
    } = ctx.request.body;
    num = Number(num);
    const book =await Book.findOne({
        _id:id,
    }).exec();
    // 没找到书
    if(!book) {
        ctx.body = {
            code: 0,
            msg: '没有找到书籍',
        };
        return;
    };
    // 找到书
    if (type === BOOK_CONST.IN) {
        // 入库操作，先转成正整数
        num = Math.abs(num);
    }else {
        // 出库操作, 先转成正数，再转负，这样一个函数就可以实现入库和出库操作了
        num = -Math.abs(num);
    }

    book.count = book.count + num;
    if (book.count < 0) {
        ctx.body={
            code: 0,
            msg: '剩下的书籍量不满足出库条件',
        };
        return;
    };

    const res = await (await book).save();
    ctx.body = {
        datat: res,
        code: 1,
        msg: '操作成功',
    };
});

module.exports = router;