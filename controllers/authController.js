const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

// Token Generation
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Create and send token
const createSendToken = (user, statusCode, res) => {
  // Token generation
  const token = signToken(user._id);
  // Cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  // Cookie settings
  res.cookie('jwt', token, cookieOptions);
  // Remove password from output
  user.password = undefined;
  // Send responce
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      data: user
    }
  });
};

exports.signUp = appErrorAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });
  // Create and send token
  createSendToken(newUser, 201, res);
});
