/**
 * Created by xiaoniao on 16/9/6.
 */
var Comment = require('../models').Comment;
var utils = require('../common/mongooseutils');

function newComment(topicId, userId, replyTo, content, callback) {
    var comment = new Comment();
    comment.topic = utils.makeObjectId(topicId);
    comment.user = utils.makeObjectId(userId);
    
    if (replyTo) {
        comment.reply = utils.makeObjectId(replyTo);
    }
    
    comment.content = content;
    comment.save(callback);
}

function queryComments(topicId, callback) {
    Comment.find({topic: topicId})
        .populate('user')
        .populate('reply')
        .exec(callback);
}

module.exports = {
    newComment: newComment,
    queryComments: queryComments
};
