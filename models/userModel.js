const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Inserire nome e cognome dell'utente"],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Inserire la mail'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Inserire una mail valida']
  },
  titolo: {
    type: String,
    trim: true
  },
  firma: {
    type: String,
    trim: true
  },
  interno: Number,
  browserPosta: {
    type: mongoose.Schema.ObjectId,
    ref: 'BrowserPosta'
  },
  directoryScansioni: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Inserire la password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confermare la password'],
    //select: false,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Le password non sono simili!'
    }
  },
  passwordChangedAt: {
    type: Date,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

// PRE and POST Hook -----------------------------------------------------------------------------
// Select only active users
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// ---------------------------------------------------------------------------------
// Compare the two password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//Create the password for the token reset
userSchema.methods.createPasswordResetToke = async function () {
  // Generate a reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  // Save the reset token and expire in token field
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  // Return the generated token
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
