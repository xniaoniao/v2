/**
 * Created by xiaoniao on 16/9/6.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSChema = new Schema({
    topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    reply: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {type: String}
});

exports.Schema = CommentSChema;