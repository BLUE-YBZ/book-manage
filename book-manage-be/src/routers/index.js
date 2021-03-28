const auth = require('./auth/index');
const invite = require('./InviteCode/index')
module.exports = (app) => {
    app.use(auth.routes());
    app.use(invite.routes());
    
};