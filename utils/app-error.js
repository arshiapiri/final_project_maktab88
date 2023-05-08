class AppError extends Error {
	constructor(statusCode, errMessage,message) {
		super(message)
		this.statusCode = statusCode;
		this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
		this.message = errMessage;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = AppError