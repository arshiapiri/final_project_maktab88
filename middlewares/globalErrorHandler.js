const globalError = (err, req, res, next) => {
	const {
		statusCode = 500,
		status = 'error',
		message = 'something went wrong, not fault :)'
	} = err;

	res.status(statusCode).json({ status, message });
} 
module.exports =  globalError 