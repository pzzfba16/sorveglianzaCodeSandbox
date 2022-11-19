const mongoose = require('mongoose');
const validator = require('validator');

const espertoSchema = new mongoose.Schema({
  idA: {
    type: Number,
    unique: true
  },
  esperto: {
    type: String,
    required: [true, 'Cognome e nome esperto'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Indicare email esperto'],
    trim: true,
    validate: [validator.isEmail, 'Inserire una mail valida']
  },
  telefono: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

const Esperti = mongoose.model('Esperti', espertoSchema);

module.exports = Esperti;
