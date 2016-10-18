/**
 * Created by xiaoniao on 16/10/17.
 */
var express = require('express');
var router = express.Router();
const Topic = require('../services/topic');
const loginRequire = require('../common/loginChecker').loginRequire;

router.post('/new', function(req, res, next){

    var title = req.body.title;
    var createId =  req.locals.user.id;
    var content = req.body.content;
    //var tabId = req.body.tabId;
    var tabId = "5805de5c7b7f634f81a3d7b2";
    // var pin = req.body.pin;

    Topic.newTopic(title, content, createId, tabId, 0, function(err, topic) {
        if (err) {
            res.status(400);
            console.log(err);
            return res.send({success: false, msg: 'err'});
        }
        return res.send({success: true, msg: topic});
    })
});

router.get('/', function (req, res, next) {
    res.send(req.query.id);
});

module.exports = router;
