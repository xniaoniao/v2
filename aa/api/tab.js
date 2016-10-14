var Tab = require('../services/tab');
var validator = require('validator');
const express = require('express');
const router = express.Router();

router.post('/tab/new',function (req, res, next) {
    var title = req.body.title;
    var describe = req.body.describe;
    var avatar = req.body.avatar;
    Tab.createTab(title, describe, avatar, function (err, tab) {
        if (err) {
            res.sattus(400);
            res.send({success: false, msg: err.message});
        }
        res.send({success: true, data: tab})
    })
});

router.get('/tab',function (req, res, nest) {
    Tab.getAllTab(function (err, tabs) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: err.message});
        }
        res.send({success: true, data: tabs});
    })
});

router.get('/tab:/tabId', function (req, res, next) {
    var id = String(req.params.id);
    console.log(id);
    if (!validator.isMongoId(id)) {
        res.status(400);
        return res.send({success: false, msg: 'id不正常'});
    }
    Tab.getTab(id, function (err, tab) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: err.message});
        }
        res.send({success: true, data: tab});

    })
});

module.exports = router;
