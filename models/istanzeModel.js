const mongoose = require('mongoose');

const posGiuSchema = new mongoose.Schema({
  idA: {
    type: Number,
    unique: true
  },
  istanza: {
    type: String,
    required: [true, 'Breve descrione del tipo di istanza'],
    unique: true,
    trim: true
  },
  descrizione: {
    type: String,
    required: [true, 'Descrizione del tipo di istanza'],
    trim: true
  }
});

const Istanze = mongoose.model('Istanze', posGiuSchema);

module.exports = Istanze;
