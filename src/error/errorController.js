const {
  sendErrorDev,
  sendErrorProd,
  handleDBCastError,
  handleDBValidationError,
  handleDBMongoError,
  handleJSONWebTokenError,
  handleJWTTokenExpiredError,
} = require('./utils');

const errorController = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Extract error to new object
    let error = { ...err };
    error.name = err.name;
    error.message = err.message;

    // Handle specific production errors
    if (error.name === 'CastError') error = handleDBCastError(error);
    if (error.name === 'MongoError') error = handleDBMongoError(error);
    if (error.name === 'JsonWebTokenError') error = handleJSONWebTokenError();
    if (error.name === 'TokenExpiredError')
      error = handleJWTTokenExpiredError();
    if (error.name === 'ValidationError')
      error = handleDBValidationError(error);

    sendErrorProd(error, res);
  }
};

module.exports = errorController;
