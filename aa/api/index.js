/**
 * Created by xiaoniao on 16/9/13.
 */
var express = require('express');
var router = express.Router();

var comments = require('./comments');
var tab = require('./tab');
var topic = require('./topic');
var user = require('./user');
var login = require('./login');

router.use('/login', login);
router.use('/comment', comments);
router.use('/user', user);
router.use('/tab', tab);
router.use('/topic', topic);

//login
//user
// router.post(apiVersion + '/user/new', user.newUser);
// router.get(apiVersion + '/p', user.getUserInfo);

//topic
// router.post(apiVersion + '/topic/new', topic.createTopic);
// router.get(apiVersion + '/topic', topic.getTopic);
// router.get(apiVersion + '/topic/:topicId', topic.showDetails);

//tab
// router.post(apiVersion + '/tab/new', tab.createTab);
// router.get(apiVersion + '/tab', tab.queryAllTab);
// router.get(apiVersion + 'tab/:tabId', tab.getTab);

module.exports = router;