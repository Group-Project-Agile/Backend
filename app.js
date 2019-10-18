var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const knex= require('knex');
var bodyParser = require('body-parser');
var cors = require('cors');
const config = require('./knexfile');
const dbClient=knex(config);

var middleware = require('./middleware');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());

var accountApiRouter = require('./routes/api/account');
app.use('/api/account', accountApiRouter);

app.all('/api/*', middleware.checkToken);

var bidApiRouter = require('./routes/api/bid');
app.use('/api/bid',bidApiRouter);

var bidFightApiRouter = require('./routes/api/bid_fight');
app.use('/api/bidfight',bidFightApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 
});

module.exports = app;
