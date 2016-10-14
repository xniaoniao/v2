const express = require('express');
const router = express.Router();
const Login = require('../services/login');
const loginUsers = require('../common/loginUsers');

router.post('/', function (req, res, next) {
    var loginname = req.body.loginname;
    var password = req.body.password;

    if (!loginname || !password) {
        return res.send({success: false, msg: "input error"});
    }

    Login.login(loginname, password, function (err, user) {

        if (err) {
            return res.send({success: false, msg: '账号或者密码错误 ' + err});
        }
        
        // login success
        loginUsers.generateCookie(res, user);

        return res.send({success: true, data: user});
    })
});
router.get('/logout', function(req, res) {
    var userId = req.body.loginnam;
    loginUsers.logout(userId);
});
module.exports = router;