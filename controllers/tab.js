var Tab = require('../models').Tab;

function getAllTabs(callback) {
    Tab.find({}, callback);
}

exports.getAllTabs = getAllTabs;

function createTab(title, describe, avatar, callback) {
    var tab = new Tab();
    tab.title = title;
    tab.describe = describe;
    tab.avatar = avatar;

    tab.save(callback);
}

exports.createTab = createTab;

function getTab(id, callback) {
    Tab.findOne({_id: id}, '', {}, callback);
}

exports.getTab = getTab;
