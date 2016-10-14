/**
 * Created by xiaoniao on 16/10/8.
 */
var express = require('express');
var router = express.Router();
const comments = require('../services/comment');

router.get('/new', function(req, res) {
    res.render('newComments');
});

router.post('/comments/:topicId', function(req, rees) {
    
});
module.exports = router;