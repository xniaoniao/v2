var express = require('express');
var router = express.Router();
const User = require('../services/user');
const loginRequire = require('../common/loginChecker').loginRequire;


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
    
   res.render('register');
});


// /user/register
router.post('/register', function (req, res, next) {
    // var loginname = req.body.loginname;
    var name = req.body.name;
    var email = req.body.email;
    // var avatar = req.body.avatar;
    var password = req.body.password;

    if (!password) {
        return res.render('/error', {success: false, data:'loginname or password is empty!'});
    }

    User.addNewUser(name, password, email, function(err, user) {

        if (err) {
            return res.render('/register_failed');
        }

        //return res.send({succenss: true, msg: user});
        return res.redirect('/user/balance');
    })
});

router.get('/balance', loginRequire, function(req, res, next) {
   res.render("balance")
});

module.exports = router;
