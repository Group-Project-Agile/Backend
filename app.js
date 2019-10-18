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

var datetime = new Date();
var date = new Date(datetime);
  var currentdate = date.getFullYear() +'-'+(date.getMonth() + 1)+'-' + date.getDate();

  
  // console.log(previousdate <  currentdate);
// dbClient('bids')
// .where( 'endingDate', '<', currentdate)
// .update({
//   status: 'sold'
// })
// .catch(error => {
//   console.log(error);
// })


// dbClient('bids')
// .where( 'bidCount', '=', 0)
// .update({
//   status: 'Closed'
// })
// .catch(error => {
//   console.log(error);
// })


//console.log(previousdate <  currentdate);
dbClient('bids')
.select('bidCount','bidId')
  .where('endingDate', '<', currentdate)
  .then(function(result) {
    for( var i = 0; i < result.length; i++ )
    {
      if(result[i].bidCount != 0){
        let bidsId = result[i].bidId;
        dbClient('bids')
        .where('bidId',bidsId)
          .update({
            status: 'Sold'
          }).then(function(result){
            dbClient('bids_fight')
            .select('bidId','bidAmount')
            .where('bidId', bidsId)
              .update({
                status: 'Won'
              })
            .orderBy('bidAmount', 'asc')
            .limit(1)
            .then(function(data){
                console.log(bidsId);
              })
              .catch(error => {
                console.log(error);
              })
          })
          .catch(error => {
            console.log(error);
          })
      }else{
        dbClient('bids')
        .where('bidId',result[i].bidId)
          .update({
            status: 'Closed'
          })
          .catch(error => {
            console.log(error);
          })
      }
    } 
  }

    
  )
  .catch(error => {
    console.log(error);
  })



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
