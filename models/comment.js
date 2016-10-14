var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    topic: {type: Schema.Types.ObjectId, ref: "Topic"},    
    user: {type: Schema.Types.ObjectId, ref: "User"},    
    reply: {type: Schema.Types.ObjectId, ref: "User"},    
    content: {type: String}
});

exports.Schema = CommentSchema;