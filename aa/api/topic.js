var topic = require('../services/topic');
var comment = require('../services/comment');
var validator = require('validator');
const express = require('express');
const router = express.Router();

router.post('/new/topic', function (req, res, nest) {
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var tab = req.query.tab || 'all';
    var limit = Number(req.query.limit) || 20;

    if (!validator.isMongoId(tab)) {
        res.status(400);
        res.send({success: false, msg: '不是有效的tab id'});
    }

    var options = {skip: (page - 1) * limit, limit: limit, sort: '-last_touched'};
    topic.getTabTopic(tab, options, function (err, topics) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: err.message});
        }
        res.send({success: true, msg: topics});
    })
});

router.get('/topic:/topic:id', function (req, res, next) {
    var topicId = req.params.id;
    if (!validator.isMongoId(topicId)) {
        res.status(400);
        return res.send({success: false, msg: '不是有效话题id'});
    }
    var TopicPromise = new Promise(function (resolve, reject) {
        topic.getTopic(topicId, function (err, topics) {
            if (err) {
                reject(err);
            }
            resolve(topics);
        })
    });
    var commentPromise = new Promise(function (resolve, reject) {
        comment.queryComments(topicId, function(err, comment) {
            if (err) {
                reject(err);
            }
            resolve(comment);
        })
    });

    Promise.all([TopicPromise, commentPromise])
        .then(function(result) {
            var topic = {};
            topic.tab = result[0].tab;
            topic.author = result[0].author;
            topic.create_id = result[0].create_id;
            topic.title = result[0].title;
            topic.content = result[0].content;
            topic.comments = result[1];
            console.log(topic);
            console.log(result);

            res.send({success: true, data: topic});
        }, function(err) {
            res.status(400);
            res.send({success: true, data: err});
        })
});

router.get('/topic', function() {
    var title = req.body.title;
    var createId = req.body.createId;
    var content = req.body.content;
    var tabId = req.body.tabId;
    var pin = req.body.pin;

    if (!validator.isMongoId(tabId) || !validator.isMongoId(createId)) {
        res.status(400);
        return res.send({success: false, msg: '创建者id或者tab id错误'});
    }
    topic.newTopic(title, content, createId, tabId, pin, function(err, topic) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: 'err'});
        }
        res.send({success: true, data: topic});
    })
});

module.exports = router;