var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, {
    server: {poolSize: config.poolSize}
}, function (err) {
    if (err) {
        console.log("connect to %s error", config.db, err.message);
        process.exit(1);
    }
});

var CommentSchema = require("./comment").Schema;
var TabSchema = require("./tab").Schema;
var TopicSchema = require("./topic").Schema;
var UserSchema = require("./user").Schema;

var User = mongoose.model('User', UserSchema);
var Comment = mongoose.model('Comment', CommentSchema);
var Tab = mongoose.model('Tab', TabSchema);
var Topic = mongoose.model('Topic', TopicSchema);

exports.Comment = Comment;
exports.Tab = Tab;
exports.Topic = Topic;
exports.User = User;
