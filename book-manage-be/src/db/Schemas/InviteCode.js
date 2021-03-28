const mongoose = require('mongoose');
const { getMate } = require('../helpers')

const InviteCodeSchema = new mongoose.Schema({
    // 邀请码
    code: String,
    // 用来注册的账户,判断邀请码有没有被用过就看字段是不是为空
    user: String,
    meta: getMate(),
});

mongoose.model('InviteCode',InviteCodeSchema);
