const createError = require('http-errors');
const express = require('express');
const mongoose = require("mongoose")
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const apiRouter= require('./routes/api-route');
// const usersRouter = require('./routes/auth-router');
const AppError = require("./utils/app-error");
const globalError = require("./middlewares/globalErrorHandler");
const notFoundError = require("./middlewares/notFoundError");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose
	.connect('mongodb://127.0.0.1:27017/corporate')
	.then(() => {
		console.log('[+] database connected');
	})
	.catch(err => {
		console.error('[-] database connection > ', err);
	});



// routing
// app.use('/api', apiRouter);
// app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.all("*", notFoundError);


// global error handler
app.use(globalError);

module.exports = app;
