const mongoose = require('mongoose');
const { getMate} = require('../helpers');

const BookSchema = new mongoose.Schema({
    // 书名、价格、分类、作者、出版时间、
    name: String,
    price: Number,
    author: String,
    publishDate: String,
    classify: String,
    meta: getMate(),

});
mongoose.model('Book',BookSchema);
