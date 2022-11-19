const mongoose = require('mongoose');

const organiSchema = mongoose.Schema({
  idA: {
    type: Number,
    unique: true
  },
  organo: {
    type: String,
    required: [true, "Inserire il nome dell'organo"],
    trim: true
  },
  abbreviazione: {
    type: String,
    required: [true, "Inserire l'abbreviazione dell'organo"],
    trim: true,
    uppercase: true
  }
});

const Organi = mongoose.model('Organi', organiSchema);

module.exports = Organi;
