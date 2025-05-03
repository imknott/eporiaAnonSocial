var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

/**
 * This is where I define the routes to be used within the app.
 * @type {Router | {}}
 */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
const feedRouter = require('./routes/feed');
const postRouter = require('./routes/post');
const missionRouter  = require('./routes/mission');
const logoutRouter = require('./routes/logout');




var app = express();


//Defining a session for each user to ensure they stay logged in for a day.
app.use(session({
  secret: "anonkeyforyou",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400000 } // 1 day
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/js'));


//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/feed', feedRouter);
app.use('/post', postRouter);
app.use('/logout', logoutRouter);
app.use('/mission',missionRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
