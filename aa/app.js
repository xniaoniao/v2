var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
const loginParser = require('./common/loginChecker').loginParser;
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(loginParser);

// register routes
(function () {
    var api = require('./api');
    var index = require('./routes/index');
    var user = require('./routes/user');
    var comments = require('./routes/comments');
    var topic = require('./routes/topic');

    app.use('/', index);
    app.use('/api', api);
    app.use('/user', user);
    app.use('/comments', comments);
    app.use('/topic', topic);
})();


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
