var Tab = require('../../controllers/tab');
var validator = require('validator');

var createTab = function (req, res, next) {
    var title = req.body.title;
    var describe = req.body.describe;
    var avatar = req.body.avatar;
    // validate
    Tab.createTab(title, describe, avatar, function (err, tab) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: err.message});
        }
        res.send({success: true, data: tab});
    });
};

exports.createTab = createTab;

var queryAllTabs = function (req, res, next) {
    Tab.getAllTabs(function (err, tabs) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: err.message});
        }
        res.send({success: true, data: tabs});
    })
};

exports.queryAllTabs = queryAllTabs;

var getTab = function (req, res, next) {
    var id = String(req.params.id);
    console.log(id);

    if (!validator.isMongoId(id)) {
        res.status(400);
        return res.send({success: false, msg: "id 错误"});
    }

    Tab.(id, function (err, tab) {
        if (err) {
            res.status(400);
            return res.send({success: false, msg: err.message}); 
        }
        res.send({success: true, data: tab});
    });
};

exports.getTab = getTab;