const mongoose = require('mongoose');

const procedimentiUSSchema = mongoose.Schema({
  aSius: {
    type: Number,
    required: [true, "L'anno del SIUS deve essere inserito obbligatoriamente!"],
    trim: true
  },
  nSius: {
    type: Number,
    required: [true, 'Il numero SIUS deve essere inserito obbligatoriamente!'],
    trim: true
  },
  istanze: {
    type: mongoose.Schema.ObjectId,
    ref: 'Istanze'
  },
  soggetto: {
    type: String,
    required: [
      true,
      'Il nome del soggetto deve essere inserito obbligatoriamente!'
    ],
    trim: true
  },
  slug: String,
  deposito: Date,
  udienzaData: Date,
  udienzaOra: Date,
  penaInizio: Date,
  penaFine: Date,
  penaTipo: {
    type: String,
    enum: {
      values: ['Fine pena', 'Scarcerato per fine pena'],
      message:
        'Il tipo di fine pena può essere: Fine pena o Scarcerato per fine pena'
    }
  },
  definitivo: {
    type: Boolean,
    default: true
  },
  valutatoDa: String,
  valutatoFino: Date,
  posizioneGiuridica: {
    type: mongoose.Schema.ObjectId,
    ref: 'PosGiu'
  },
  sede: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sedi'
  },
  liberatoria: {
    type: Boolean,
    default: false
  },
  urgente: {
    type: Boolean,
    default: false
  },
  misura: {
    misuraDomicilio: {
      type: String,
      trim: true
    },
    misuraPresso: {
      type: String,
      trim: true
    }
  },
  lavoro: {
    type: String,
    trim: true
  },
  asl: {
    type: String,
    trim: true
  },
  espiazione: {
    type: String,
    enum: {
      values: ['In espiazione della pena in regime', 'In atto libero'],
      message:
        'Il tipo di espiazione può essere: In espiazione della pena in regime o In atto libero'
    }
  },
  provvedimento: {
    type: String,
    enum: {
      values: [
        'Al provvedimento di cumulo emesso il',
        'Alla sentenza emessa il'
      ],
      message: 'Il tipo di provvedimento può essere: Cumulo o Sentenza'
    }
  },
  provvedimentoData: Date,
  accompagnatore: String,
  organo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organi'
  },
  semestri: Number,
  desizione: {
    type: String,
    enum: {
      values: ['Concede', 'Inammissibile', 'NLD/NDP', 'Rigetto'],
      message:
        'Il tipo di provvedimento può essere: Concede, Inammissibile, NLP/NDP o Rigetto'
    }
  },
  magistrato: {
    type: mongoose.Schema.ObjectId,
    ref: 'Magistrati'
  },
  affollamento: {
    giorniSoffernza: Number,
    giorniRiduzione: Number,
    giorniIndennizzo: Number,
    indennizzo: Number,
    risarcimento: {
      type: String,
      trim: true
    }
  },
  esecuzioneDomicilio: {
    totaleA: Number,
    totaleM: Number,
    totaleG: Number,
    presoffA: Number,
    presoffM: Number,
    presoffG: Number,
    condonatoA: Number,
    condonatoM: Number,
    condonatoG: Number,
    residuoA: Number,
    resideoM: Number,
    resideoG: Number
  },
  parese: {
    type: String,
    enum: {
      values: ['Favorevole', 'Contrario'],
      message: 'Il parere può essere: Favorevole o Contrario'
    }
  },
  difensoreTipo: {
    type: String,
    enum: {
      values: ["D'Ufficio", 'Di fiducia'],
      message: "Il difensore può essere: d'Ufficio o Di fiducia"
    }
  },
  difensore: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Avvocati'
    }
  ]
});

procedimentiUSSchema.pre('save', function (next) {
  this.slug = this.aSius + '/' + this.nSius;
  next();
});

const procedimentiUS = mongoose.model('ProcedimentiUS', procedimentiUSSchema);

module.exports = procedimentiUS;
