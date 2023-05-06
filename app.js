const express = require('express');
const app = express();
const { join } = require('node:path');
const { AppError } = require('./utils/app-error');
const apiRouter = require('./routes/api-route');
const viewRouter = require('./routes/view-route');

// setup view engine:ejs
app.set('view engine', 'ejs');
app.set('views', join(__dirname, './views'));

// sever static files
app.use(express.static(join(__dirname, './public')));

// body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// routing
app.use('/', viewRouter);
app.use('/api', apiRouter);

// 404 handler
app.all('*', (req, res, next) => {
	next(new AppError(404, `${req.method} ${req.originalUrl} not found!`));
});

// global error handler
app.use((err, req, res, next) => {
	const {
		statusCode = 500,
		status = 'error',
		message = 'something went wrong, not fault :)'
	} = err;

	res.status(statusCode).json({ status, message });
});

app.listen(8000, '127.0.0.1', () => console.log('Listening on :8000 ...'));
