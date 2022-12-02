const mongoose = require('mongoose');
//const validator = require('validator');

const magistratiSchema = mongoose.Schema({
  idA: {
    type: Number,
    unique: true
  },
  titolo: {
    type: String,
    required: [true, 'Inserire il titolo del magistrato'],
    trim: true
  },
  magistrato: {
    type: String,
    required: [true, 'Inserire il nome del Magistrato'],
    trim: true
  },
  competenza: {
    type: String,
    trim: true,
    uppercase: true
    // validate: [validator.isAlpha, 'Inserire solo caratteri']
  },
  sostitutoDi: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

const Magistrati = mongoose.model('Magistrati', magistratiSchema);

module.exports = Magistrati;
