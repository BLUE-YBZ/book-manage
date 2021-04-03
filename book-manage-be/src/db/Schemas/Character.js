const mongoose = require('mongoose');
const { getMate, preSave } = require('../helpers.js');

const CharacterSchema = new mongoose.Schema({
    name: String, //标记是成员，还是管理员
    title:String, // 文字描述成员、管理员
    power: Object,
    meta: getMate(),
});
CharacterSchema.pre('save', preSave);
mongoose.model('Character',CharacterSchema);
