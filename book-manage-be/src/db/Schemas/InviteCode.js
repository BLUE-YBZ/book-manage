const mongoose = require('mongoose');
const { getMate, preSave } = require('../helpers')

const InviteCodeSchema = new mongoose.Schema({
    // 邀请码
    code: String,
    // 用来注册的账户,判断邀请码有没有被用过就看字段是不是为空
    user: String,
    meta: getMate(),
});
InviteCodeSchema.pre('save',preSave);
mongoose.model('InviteCode',InviteCodeSchema);
