const mongoose = require('mongoose');

const richiestaSchema = mongoose.Schema({
  istanza: {
    type: mongoose.Schema.ObjectId,
    ref: 'Istanze'
  },
  titolo: {
    type: String,
    required: [true, 'Il titolo della richiesta è obbligatorio'],
    trim: true,
    maxlength: [100, 'Il titolo non può avere più di 100 caratteri'],
    minlength: [3, 'Il titolo non può avere meno di 3 caratteri']
  },
  oggetto: {
    type: String,
    required: [true, "L'oggetto della richiesta è obbligatorio"],
    trim: true,
    minlength: [3, "L'oggetto non può avere meno di 3 caratteri"]
  },
  testo: {
    type: String,
    required: [true, 'Inserire il testo della richiesta'],
    trim: true,
    minlength: [15, "L'oggetto non può avere meno di 15 caratteri"]
  },
  parametro: {
    type: Boolean,
    default: false
  },
  parametroDescrizione: {
    type: String,
    trim: true
  },
  report: {
    type: String,
    trim: true
  }
});

const Richieste = mongoose.model('Richieste', richiestaSchema);

module.exports = Richieste;
