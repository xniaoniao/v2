const express = require('express');
const router = express.Router();
var Comment = require('../services/comment');
var validator = require('validator');

router.post('/new', function (req, res) {
    var topicId = req.body.topicId;
    var userId = req.body.userId;
    var replyTo = req.body.replyTo;
    var content = req.body.content;

    if (!validator.isMongoId(topicId) || !validator.isMongoId(userId)) {
        res.status(400);
        res.send({success: true, msg: 'topic or user id错误'});
    }
    
    if (replyTo && !validator.isMongoId(replyTo)) {
        replyTo = '';
    }
    
    Comment.newComment(topicId, userId, replyTo, content, function (err, comment) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: err.message});
        }
        res.send({success: true, data: comment});
    })
});

router.get('/comments/:topicId', function (req, res, next) {
    var topicId = req.params.topicId;
    
    if (!validator.isMongoId(topicId)) {
        res.status(400);
        return res.send({success: false, msg: 'id错误'});
    }
    Comment.queryComments(topicId, function (err, comment) {
        if (err) {
            res.status(400);
            res.send({success: false, msg: 'id错误'});
        }
        res.send({success: true, data: comment});
    })
});


module.exports = router;
