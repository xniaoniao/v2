/**
 * Created by xiaoniao on 16/9/6.
 */
var Tab = require('../models').Tab;
var utils = require('../common/mongooseutils');

function getAllTabs(callback) {
    Tab.find({}, callback);
}

function createTab(title, describe, avatar, callback) {
    var tab = new Tab();
    tab.title = title;
    tab.decribe = describe;
    tab.avatar = avatar;

    tab.save(callback);
}

function getTab(id, callback) {
    Tab.find({_id: id}, callback);
}

module.exports = {
   getAllTab : getAllTabs,
    createTab: createTab,
    getTab: getTab
};