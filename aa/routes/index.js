var express = require('express');
var router = express.Router();
const User = require('../services/user');
const LoginUsers = require('../common/loginUsers');

/* GET home page. */
router.get('/', function (req, res, next) {
    // todo  parse user id

    // res.render('index', {'title': 'express', 'user': res.locals.user});
    res.render('index', {'title': 'express'});

});

router.get('/index', function (req, res) {
    res.render("index", {title: 'xiaoniaoniao'});
});

router.get('/signin', function (req, res) {
    res.render('signin');
});

router.post('/signin', function (req, res) {
    // check login
    var loginname = req.body.loginname;
    var password = req.body.password;
    // console.log(req.body);

    User.getUserByLoginName(loginname, function (err, user) {

        if (err) {
            res.redirect("/signin");
            return;
        }
        if (user[0].password != password) {
            return res.redirect("/signin");
        }

        LoginUsers.generateCookie(res, user[0]);
        res.redirect('/');
    })
});


module.exports = router;
