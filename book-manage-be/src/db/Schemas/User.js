const mongoose = require('mongoose');
const { getMate, preSave } = require('../helpers.js')
const userschema = new mongoose.Schema({
    account: String,
    password: String,
    character: String, // 记录角色的id
    // 时间戳
    meta: getMate(),

});
userschema.pre('save', preSave);
// 注册一个模型
mongoose.model('User', userschema);
