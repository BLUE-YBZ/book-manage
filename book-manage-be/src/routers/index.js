const auth = require('./auth/index');
const invite = require('./InviteCode/index')
const book = require('./book/index');
module.exports = (app) => {
    app.use(auth.routes());
    app.use(invite.routes());
    app.use(book.routes());
};