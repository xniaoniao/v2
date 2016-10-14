
var user = require('./user');
var loginUsers = require('../common/loginUsers');

function login(loginname, password, callback) {
    var u = loginUsers.find(loginname);
    if (u) {
        if (u.password != password) {
            return callback("wrong password");
        }
        
        return callback(null, u);
    }

    user.getUserByLoginName(loginname, function (error, u) {
        if (error) {
            return callback(error);
        }

        if (u[0].password != password) {
            return callback("wrong password");
        }

        loginUsers.addLoginUser(u[0]);

        return callback(null, u[0]);
    })
}
exports.login = login;