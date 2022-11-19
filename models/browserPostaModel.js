const mongoose = require('mongoose');

const browserSchema = new mongoose.Schema({
  idA: {
    type: Number,
    unique: true
  },
  posta: {
    type: String,
    required: [true, 'Indicare il nome del browser'],
    trim: true
  }
});

const BroserPosta = mongoose.model('BrowserPosta', browserSchema);

module.exports = BroserPosta;
