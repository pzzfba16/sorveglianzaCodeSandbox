const mongoose = require('mongoose');
const validator = require('validator');

const avvSchema = new mongoose.Schema({
  idA: {
    type: Number,
    unique: true
  },
  avvocato: {
    type: String,
    required: [true, "Indicare il cognome e nome dell'avvocato"],
    trim: true,
    maxlength: [
      100,
      "Il nome dell'avvocato non può avere più di 100 caratteri"
    ],
    minlength: [3, "Il nome dell'avvocato non può avere meno di 3 caratteri"]
  },
  foro: {
    type: String,
    required: [true, "Indicare il foro dell'avvocato"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Indicare l'email dell'avvocato"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Inserire una email valida']
  }
});

const Avvocati = mongoose.model('Avvocati', avvSchema);

module.exports = Avvocati;
