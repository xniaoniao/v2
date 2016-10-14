
var User = require('../services/user');
const express = require('express');
const router = express.Router();
    
router.get('/p', function (req, res, next) {
    var loginname = req.query.loginname;
    User.getUserByLoginName(loginname, function (err, user) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: "用户不存在"});
        }
        return res.send({success: true, data: user});
    })
});

// router.post('/new/user', function (req, res, next) {
//     // var loginname = req.body.loginname;
//     var name = req.body.name;
//     var email = req.body.email;
//     // var avatar = req.body.avatar;
//     var password = req.body.password;
//
//     if (!loginname || !password) {
//         res.status(400);
//         return res.send({success: false, data:'loginname or password is empty!'});
//     }
//
//     User.addNewUser(name, password, email,function(err, user) {
//         if (err) {
//             res.status(404);
//             return res.send({success: false, msg: '注册失败'});
//         }
//         //return res.send({succenss: true, msg: user});
//         return res.redirect('/index');
//     })
// });

module.exports = router;