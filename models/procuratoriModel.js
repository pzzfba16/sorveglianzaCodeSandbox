const mongoose = require('mongoose');

const procuratoreSchema = new mongoose.Schema({
  idA: {
    type: Number,
    unique: true
  },
  titolo: {
    type: String,
    required: [true, 'Inserire il titolo del procuratore'],
    trim: true
  },
  procuratore: {
    type: String,
    required: [true, 'Inserire il nome e cognome del Procuratore'],
    trim: true
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

const Esperti = mongoose.model('Procuratori', procuratoreSchema);

module.exports = Esperti;
