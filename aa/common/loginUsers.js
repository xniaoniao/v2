/**
 * Created by xiaoniao on 16/9/21.
 */

const user = require('../services/user');
var users = [];

exports.addLoginUser = function (u) {
    users.push(u);
};

exports.logout = function( u) {
    users.pop(u);
};

exports.find = function (loginName) {
    for (var i = 0; i < users.length; i++) {
        if (users[i] == loginName) {
            return loginName;
        }
    }
    return null;
};

function makeCookie(user) {
    // md5

    return user.loginname;
}

exports.generateCookie = function (res, user) {

    //res.cookie("account", {name: user.loginname, id: makeCookie(user)});
    res.cookie("account", user.loginname);
};

exports.isLoginUser = function (req, res, next) {

    if (!req.cookie  || !req.cookie['account']) {
        return res.redirect('/api/login');
    }
    
    const cookie = req.cookie['account'];
    user.getUserByLoginName(cookie.name, function (err, user) {

        if (err) {
            return res.redirect("/api/login");
        }
        
        const id = makeCookie(user);

        if (id == cookie.id) {
            return next();
        }
        
        return res.redirect('/api/login');
    });
};