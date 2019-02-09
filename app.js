require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var zatRoute = require('./routes/zatRoute')
var acuityAPI = require('./routes/acuityAPI')
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
app.use(cors({origin: `http://localhost:${process.env.PORT}`}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/zat', zatRoute);
app.use('/acuityAPI',acuityAPI);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${process.env.PORT}`);

    res.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
