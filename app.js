require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var zatRoute = require('./routes/zatRoute')
var acuityAPI = require('./routes/acuityAPI')
var acuityAPI2 = require('./routes/acuityAPI2')
var acuityAPI3 = require('./routes/acuityAPI3')
var app = express();
var cors = require('cors');

// use it before all route definitions

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: `http://localhost:3000`}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/zat', zatRoute);
app.use('/acuityAPI',acuityAPI);
app.use('/acuityAPI2',acuityAPI2);
app.use('/acuityAPI3',acuityAPI3);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


    // Pass to next layer of middleware
    next();

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
