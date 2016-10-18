/**
 * Created by xiaoniao on 16/10/17.
 */
const User = require('../services/user');

function loginRequire(req, res, next) {
    if (req.locals && req.locals.user) {
        next();
    } else {
        res.redirect('/signin');
    }
}

function loginParser(req, res, next) {
    var cookie = req.cookies || {};
    var userId = cookie.account;

    if (userId) {
        User.getUserByLoginName(userId, function (err, user) {
            if (!err) {
                // todo auth 
                req.locals = {};
                req.locals.user = user[0];
                res.locals.user = user[0];
            }
            next();
        })
    } else {
        next();
    }
}


module.exports = {
    'loginRequire': loginRequire,
    'loginParser': loginParser
};