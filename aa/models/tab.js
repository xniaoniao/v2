/**
 * Created by xiaoniao on 16/9/6.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TabSchema = new Schema({
   title: {type: String},
    describe: {type: String},
    avatar: {type: String},
    created_at: {type: Number}
});
exports.Schema = TabSchema;