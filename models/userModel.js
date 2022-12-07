const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  user: {
    type: String,
    required: [true, "Inserire cognome e nome dell'utente"],
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
    select: false,
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

// Select only active users
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
