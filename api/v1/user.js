var User = require('../../controllers/user');
var validator = require('validator');

var getUserInfo = function (req, res, next) {
    var loginname = req.query.loginname;

    User.getUserByLoginName(loginname, function (err, user) {
        if (err) {
            res.status(404);
            return res.send({success: false, msg: "用户不存在"});
        }

        return res.send({success: true, data: user});
    })
};

exports.getUserInfo = getUserInfo;


// post
var newUser = function (req, res, next) {
    var loginname = req.body.loginname;
    var password = req.body.password;
    var name = req.body.name;
    var avatar =  req.body.avatar;

    if (!loginname || !password) {
        res.status(400);
        return res.send({success: false, msg: "login name or password is empty"});
    }

    User.addNewUser(loginname, name, password, avatar, function (err, user) {
        if (err) {
            res.status(404);
            return res.send({success: false, msg: "新建用户失败"});
        }

        return res.send({success: true, data: user});
    });
};

exports.newUser = newUser;