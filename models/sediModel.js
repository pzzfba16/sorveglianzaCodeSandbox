const mongoose = require('mongoose');
const validator = require('validator');

const sediSchema = mongoose.Schema({
  idA: {
    type: Number,
    unique: true
  },
  sede: {
    type: String,
    required: [true, 'Inserire il nome della sede'],
    trim: true,
    nimlenght: [5, 'La sede non può avere meno di 5 caratteri']
  },
  indirizzo: {
    type: String,
    tim: true
  },
  cap: {
    type: Number,
    validate: [validator.isNumeric, 'Inserire solo numeri']
  },
  telefono: {
    type: String,
    trim: true
  },
  detentiva: {
    type: Boolean
  },
  immigrazione: {
    type: Boolean
  },
  email: {
    type: String,
    required: [true, 'Inserire una mail valida'],
    trim: true,
    unique: [true, 'La mail digitata è già presente'],
    validate: [validator.isEmail, 'Inserire un indirizzo email valido']
  },
  distretto: {
    type: Boolean,
    default: false
  },
  note: {
    type: String,
    trim: true
  },
  emailCollegate: {
    idIstanza: {
      type: mongoose.Types.ObjectId,
      ref: 'Istanze'
    },
    protocollo: {
      type: String,
      enum: ['A', 'CC', 'CCN']
    },
    emailCollegata: {
      type: String,
      trim: true,
      validate: [validator.isEmail, 'Inserire un indirizzo email valido']
    }
  }
});

const Sedi = mongoose.model('Sedi', sediSchema);

module.exports = Sedi;
