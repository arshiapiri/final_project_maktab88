class AppError {
	constructor(statusCode, errMessage) {
		this.statusCode = statusCode;
		this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
		this.message = errMessage;

		Error.captureStackTrace(this);
	}
}

export default { AppError };
