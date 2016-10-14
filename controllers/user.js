var User = require('../models/').User;

function getUserById(user_id, callback) {
    if (!id) {
        return callback();
    }
    User.findOne({_id: id}, callback);
}

function getUserByLoginName(loginname, callback) {
    if (!loginname) {
        return callback({message: 'login name is empty'});
    }
    User.findOne({loginname: loginname}, '', {}, callback);
}

/**
 * loginname 一旦创建了，就不允许改变.
 */

function addNewUser(loginname, name, password, avatar, callback) {
    var user = new User();
    user.name = name;
    user.loginname = loginname;
    user.password = password;
    user.avatar = avatar;
    user.created_at = new Date().getTime();
    user.save(callback);
}

function updateName(loginname, name, callback) {
    User.update({loginname: loginname}, {name: name}, callback);
}

exports.getUserById = getUserById;
exports.getUserByLoginName = getUserByLoginName;
exports.addNewUser = addNewUser;
exports.updateName = updateName;
