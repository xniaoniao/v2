var topic = require('../../controllers/topic');
var comment = require('../../controllers/comment');
var validator = require('validator');


var getTopics = function (req, res, next) {
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var tab = req.query.tab || 'all';
    var limit = Number(req.query.limit) || 20;

    if (!validator.isMongoId(tab)) {
        res.status(400);
        return res.send({success: false, msg: '不是有效的tab id'});
    }

    var options = { skip: (page - 1) * limit, limit: limit, sort: '-last_touched'};

    topic.getTabTopics(tab, options, function (err, topics) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: err.message});
        }
        res.send({success: true, data: topics});
    })
};


exports.getTopics = getTopics;

var showDetails = function (req, res, next) {
    var topicId = req.params.id;
    if (!validator.isMongoId(topicId)) {
        res.status(400);
        return res.send({success: false, msg: '不是有效的话题id'});
    }

    var topicPromise = new Promise(function (resolve, reject) {
        topic.getTopic(topicId, function (err, topic) {
            if (err) {
                reject(err);
            } else {
                resolve(topic);
            }        
        })
    });

    var commentsPromise = new Promise(function (resolve, reject) {
        comment.queryComments(topicId, function (err, comments) {
            if (err) {
                reject(err);
            } else {
                resolve(comments);
            }
        })
    });

    Promise.all([topicPromise, commentsPromise])
    .then(function (result) {
        var topic = {};
        topic.tab = result[0].tab;
        topic.author = result[0].creator;
        topic.created_at = result[0].created_at;
        topic.title = result[0].title;
        topic.content = result[0].content;
        topic.comments = result[1];
        console.log(topic);

        res.send({success: true, data: topic}); 
    }, function (errs) {
        res.status(400);
        return res.send({success: false, msg: errs});
    });
};

exports.showDetails = showDetails;



var createtopic = function (req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var creatorId = req.body.creatorId;
    var tabId = req.body.tabId;
    var pin = req.body.pin;

    if (!validator.isMongoId(creatorId) || !validator.isMongoId(tabId)) {
        res.status(400);
        return res.send({success: false, msg: '创建者ID 或者 Tab id 不对'});
    }

    topic.newTopic(title, content, creatorId, tabId, pin, function (err, topic) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: err.message});
        }
        res.send({success: true, data: topic});
    });
};

exports.createtopic = createtopic;