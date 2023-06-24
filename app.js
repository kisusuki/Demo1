var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//tao router 
var adminRouter = require('./routes/admin');
var app = express();

//1. cấu hình body-parser (lấy dữ liệu từ form)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));

//2. cấu hình mongoose (làm việc với DB)
var mongoose = require('mongoose');
var uri = "mongodb+srv://mikakimochi2k3:22112010@demo1.i1fczyl.mongodb.net/ToyStory"; //gch1102: db name
mongoose.connect(uri)
.then(() => { console.log ("succeed !")})
.catch((err) => { console.log ("failed") });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//config router
app.use('/admin',adminRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = 3001;
app.listen(port);

module.exports = app;
