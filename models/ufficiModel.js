const mongoose = require('mongoose');
const validator = require('validator');

const ufficiSchema = new mongoose.Schema({
  idA: {
    type: Number,
    required: true,
    unique: true
  },
  ufficio: {
    type: String,
    required: [true, "L'ufficio deve avere una descrizione"],
    unique: true,
    trim: true,
    maxlength: [
      100,
      "La descrizione dell'ufficio non può avere più di 40 caratteri"
    ],
    minlength: [
      5,
      "La descrizione dell'ufficio non può avere meno di 5 caratteri"
    ]
  }, // String is shorthand for {type: String}
  indirizzo: {
    type: String,
    required: [true, "Indicare l'indirizzo dell'ufficio"],
    trim: true
  },
  citta: {
    type: String,
    required: [true, 'Indicare la città'],
    trim: true
  },
  telefono: {
    type: String,
    required: [true, 'Indicare un numero di telefono'],
    trim: true
  },
  pec: {
    type: String,
    required: [true, 'Indicare un indirizzo pec'],
    trim: true,
    validate: [validator.isEmail, 'Inserire una pec valida']
  },
  peo: {
    type: String,
    required: [true, 'Indicare un indirizzo pec'],
    trim: true,
    validate: [validator.isEmail, 'Inserire una peo valida']
  }
});

const Uffici = mongoose.model('Uffici', ufficiSchema);

module.exports = Uffici;
