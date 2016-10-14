var express = require('express');
var router = express.Router();

var user = require('./v1/user');
var topic = require('./v1/topic');
var tab = require('./v1/tab');
var comment = require('./v1/comments');

var apiVersion = "/v1";

// user
router.post(apiVersion + '/user/new', user.newUser);
router.get(apiVersion + '/p', user.getUserInfo);

// topics
router.post(apiVersion + '/topic/new', topic.createtopic);
router.get(apiVersion + '/topics', topic.getTopics);
router.get(apiVersion + '/topic/:id', topic.showDetails);

// comments
router.post(apiVersion + '/comments/new', comment.newComment);
router.get(apiVersion + '/comments/:topicId', comment.queryComments);


// tabs
router.post(apiVersion + '/tab/new', tab.createTab);
router.get(apiVersion + '/tabs', tab.queryAllTabs);
router.get(apiVersion + '/tab/:id', tab.getTab);


module.exports = router;
