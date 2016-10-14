var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    loginname: {type: String},
    name: {type: String},
    avatar: {type: String},
    created_at: {type: Number},
    password: {type: String}
});

exports.Schema = UserSchema;