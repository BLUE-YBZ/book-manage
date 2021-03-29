require('./Schemas/User');
require('./Schemas/InviteCode');// require 引入就相当于将其中的内容进行执行
require('./Schemas/Book');
const mongoose = require('mongoose');

const connect = () => {
    return new Promise((resolve) => {
        // 连接数据库
        // 添加数据库内容，需要明确数据库、集合、文档
        mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');
        // 监听数据库被打开时候的操作
        mongoose.connection.on('open', () => {
            console.log("数据库连接成功");
            resolve();
        });  
    });
};
module.exports={connect,} 

