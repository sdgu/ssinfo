var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require("mongodb");
// var monk = require("monk");
// var db = monk("localhost:27017/ssinfo");

var mongoose = require("mongoose");
//var db = "mongodb://localhost:27017/ssinfo";
//var db = 
var herokudb = "mongodb://sdgu:rl5009014@ds039115.mongolab.com:39115/heroku_45t7b97b";

//mongoose.connect("mongodb://localhost:27017/ssinfo");
mongoose.connect(herokudb);
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next)
{
  req.db = db;
  next();
})

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// var testschema = mongoose.Schema(
// {
//   author:
//   {
//     username: String,
//     pin: String
//   }
// });

// var Test = mongoose.model("Test", testschema, "ocapTest");



// var test1 = new Test(
// {
//   author:
//   {
//     username: "potato",
//     pin: "1234"
//   }
// });

// test1.save(function(err)
// {
//   if (err) throw err;
//   console.log("good");
// })


module.exports = app;
