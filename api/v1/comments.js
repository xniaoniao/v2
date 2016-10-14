var Comment = require('../../controllers/comment');
var validator = require('validator');


var newComment = function (req, res, next) {
    var topicId = req.body.topicId;
    var userId = req.body.userId;
    var replyTo = req.body.replyTo;
    var content = req.body.content;

    if (!validator.isMongoId(topicId) || !validator.isMongoId(userId)) {
        res.status(400);
        return res.send({success: false, msg: "id 错误"});
    }

    if (replyTo && !validator.isMongoId(replyTo)) {
        replyTo = "";
    }

    Comment.newComment(topicId, userId, replyTo, content, function (err, comment) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: err.message});
        }
        res.send({success: true, data: comment});
    })
};


exports.newComment = newComment;


var queryComments = function (req, res, next) {
    var topicId = req.params.topicId;
    if (!validator.isMongoId(topicId)) {
        res.status(400);
        return res.send({success: false, msg: "id 错误"});
    }

    Comment.queryComments(topicId, function (err, comments) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: err.message});
        }
        res.send({success: true, data: comments});
    });
};

exports.queryComments = queryComments;