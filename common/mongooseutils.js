var mongoose = require('mongoose');


var makeObjectId = function (id) {
    return mongoose.Types.ObjectId(id);
};


exports.makeObjectId = makeObjectId;