const mongoose = require('mongoose');
const { getMate, preSave} = require('../helpers');

const BookSchema = new mongoose.Schema({
    // 书名、价格、分类、作者、出版时间、
    name: String,
    price: Number,
    author: String,
    publishDate: String, //出版日期
    classify: String,
    count: Number, // 库存
    meta: getMate(),

});
BookSchema.pre('save',preSave);
mongoose.model('Book',BookSchema);
