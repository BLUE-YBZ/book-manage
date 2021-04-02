const mongoose = require('mongoose');
const  { getMate } = require('../helpers.js') 
const userschema = new mongoose.Schema({
    account: String,
    password: String,
    // 时间戳
    meta: getMate(),

});

// 注册一个模型
mongoose.model('User', userschema);
