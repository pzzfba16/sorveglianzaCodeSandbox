const mongoose = require('mongoose');

const posGiuSchema = new mongoose.Schema({
  idA: {
    type: Number,
    unique: true
  },
  posizioneGiuridica: {
    type: String,
    required: [true, 'Indicare una posizione giuridica'],
    unique: true,
    trim: true,
    maxlength: [
      100,
      'La posizione giuridica non può avere più di 40 caratteri'
    ],
    minlength: [3, 'La posizione giuridica non può avere meno di 5 caratteri']
  },
  detentiva: {
    type: Boolean,
    required: true,
    default: false
  }
});

const posGiu = mongoose.model('PosGiu', posGiuSchema);

module.exports = posGiu;
