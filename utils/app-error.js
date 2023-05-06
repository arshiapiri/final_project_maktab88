function AppError(statusCode, errMessage) {
	this.statusCode = statusCode;
	this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
	this.message = errMessage;

	Error.captureStackTrace(this);
}

module.exports = { AppError };
