const mongoose = require('mongoose');

const decisioneSchema = new mongoose.Schema({
  idA: {
    type: Number,
    unique: true
  },
  decisione: {
    type: String,
    required: [true, 'Il tipo di decisione'],
    trim: true
  }
});

const Decisione = mongoose.model('Decisione', decisioneSchema);

module.exports = Decisione;
