/**
 * Created by xiaoniao on 16/9/6.
 */
var mongoose = require('mongoose');
var config =  require('../config');

mongoose.connect(config.db, {
   server: {poolSize: config.poolSize}
}, function(err){
    if (err) {
        console.log('mongoose connect failed ' + err);
        process.exit(1);
    }
});

var CommentSchema = require('./comment').Schema;
var tabSchema = require('./tab').Schema;
var topicSchema = require('./topic').Schema;
var UserSchema = require('./User').Schema;

var comment = mongoose.model('Comment', CommentSchema);
var user = mongoose.model('User', UserSchema);
var topic = mongoose.model('Topic', topicSchema);
var tab = mongoose.model('Tab', tabSchema);

module.exports = {
    Comment: comment,
    User: user,
    Topic: topic,
    Tab: tab
};