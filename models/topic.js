var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    title: {type: String},
    content: {type: String},
    creator: {type: Schema.Types.ObjectId, ref: "User"},
    tab: {type: Schema.Types.ObjectId, ref: "Tab"},
    created_at: {type: Number},
    last_modified: {type: Number},
    last_touched: {type: Number},
    pin: {type: Boolean, default: false}
});

exports.Schema = TopicSchema;