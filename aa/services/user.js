/**
 * Created by xiaoniao on 16/9/10.
 */
var User = require('../models').User;

function getUserById(id, callback) {
    if (!id) {
        return callback();
    }
    User.find({id: id}, callback);
}

function getUserByLoginName(loginname, callback) {
    if (!loginname) {
        return callback(null, {message: 'login name is empty'});
    }
    User.find({loginname: loginname}, '', {}, callback);
}

function addNewUser(name, password, email, callback) {
    var user = new User();
    // user.loginname = loginName;
    user.name = name;
    user.password = password;
    user.email = email;
    // user.avatar = avatar;

    user.save(callback);
}

function update(loginName, name, callback) {
    User.update({loginnam: loginName}, {name: name}, callback);
}
module.exports = {
    getUserById: getUserById,
    getUserByLoginName: getUserByLoginName,
    addNewUser: addNewUser,
    update: update  
};