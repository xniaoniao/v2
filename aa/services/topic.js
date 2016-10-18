var Topic = require('../models').Topic;
var utils = require('../common/mongooseutils');

function getTabTopic(tabId, options, callback) {
    Topic.find({tab: tabId}, '', options, callback);
}

function newTopic(title, content, creatorId, tabId, pin, callback) {
    var topic = new Topic();
    topic.title = title;
    topic.content = content;
    topic.creatorId = utils.makeObjectId(creatorId);
    topic.tab = tabId;
    topic.created_at = topic.last_modified = topic.last_touched = new Date().getTime();
    // topic.pin = pin;

    topic.save(callback);
}

function getTopic(topicId, callback) {
    Topic.find({_id: topicId})
        .populate('creatorId')
        .populate('tab')
}

function pinTopic(topicId, pin, callback) {
    Topic.update({topic: topicId}, {pin: pin}, callback);
}

module.exports = {
     getTabTopic: getTabTopic,
     getTopic: getTopic,
     pinTopic: pinTopic,
     newTopic: newTopic
};