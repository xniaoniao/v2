var Topic = require('../models').Topic;
var utils = require('../common/mongooseutils');

function getTabTopics(tabId, options, callback) {
    Topic.find({tab: tabId}, '', options, callback);
}

function newTopic(title, content, creatorId, tabId, pin, callback) {
    var topic = new Topic();
    topic.title = title;
    topic.content = content;
    topic.creator = utils.makeObjectId(creatorId);
    topic.tab = utils.makeObjectId(tabId);
    topic.last_touched = topic.modified = topic.created_at = new Date().getTime();
    topic.pin = pin;

    topic.save(callback);
}

function getTopic(topicId, callback) {
    Topic.findOne({_id: topicId})
        .populate('tab')
        .populate('creator')
        .exec(callback);
}

function pinTopic(topicId, pin, callback) {
    Topic.update({_id: topicId}, {pin: pin}, callback);
}

exports.getTabTopics = getTabTopics; 
exports.newTopic = newTopic;
exports.getTopic = getTopic;
exports.pinTopic = pinTopic;