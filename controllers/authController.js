const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

// Register a new user ----------------------------------------------
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

// Log In of the user ------------------------------------------------
exports.logIn = appErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

// Forgot password ---------------------------------------------------------
exports.forgotPassword = appErrorAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError(`Nessun utente con questa email: ${req.body.email}.`, 404)
    );
  }
  // 2) Generate the random reset token and save the data
  const resetToken = user.createPasswordResetToke();
  await user.save({ validateBeforeSave: false });
  // 3) Send the resetToken to user's email
  try {
    // Prepare the URL
    const restURL = `${req.protocol}://${req.get(
      'host'
    )}/users/resetPassword/${resetToken}`;
    console.log(restURL);
  } catch (err) {}
});

// Reset password ---------------------------------------------------------
exports.resetPassword = appErrorAsync(async (req, res, next) => {});

// FUNCTIONS -----------------------------------------------------------------
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
