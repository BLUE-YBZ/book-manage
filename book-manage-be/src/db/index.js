const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    age: Number
});
// 生成一个model，命名为User，依据UserSchema生成。
const UserModal = mongoose.model('User',UserSchema )
const connect = () => {
    // 连接数据库
    // 添加数据库内容，需要明确数据库、集合、文档
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');
    // 监听数据库被打开时候的操作
    mongoose.connection.on('open',()=>{
        console.log("连接成功");
        
        const user = new UserModal({
            nickname: '小敏',
            password: "123456",
            age: 12
        });
        user.save();
    });
};
connect();

