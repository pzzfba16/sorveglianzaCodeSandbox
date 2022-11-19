const mongoose = require('mongoose');

const entiSchema = new mongoose.Schema({
  idA: {
    type: Number,
    unique: true
  },
  ente: {
    type: String,
    required: [true, "Inserire il nome dell'ente"],
    trim: true
  }
});

const Enti = mongoose.model('Enti', entiSchema);

module.exports = Enti;
