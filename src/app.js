// Third Party Imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Project Imports
const globalErrorHandler = require('./error/errorController');
const userRouter = require('./users/userRouter');
const recipeRouter = require('./recipes/recipeRouter');
const AppError = require('./error/appError');

const app = express();

// MIDDLEWARES
app.use(cors());

// SEE API REQUEST
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//  Body parser
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public/client/build')));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/recipes', recipeRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
