const mongoose = require('mongoose');
const validator = require('validator');
//const moment = require('moment');

const istanzaUSSchema = mongoose.Schema(
  {
    aSius: {
      type: Number,
      required: [
        true,
        "L'anno del SIUS deve essere inserito obbligatoriamente!"
      ],
      trim: true
    },
    nSius: {
      type: Number,
      required: [
        true,
        'Il numero SIUS deve essere inserito obbligatoriamente!'
      ],
      trim: true
    },
    istanza: {
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
    slug: {
      type: String,
      unique: {
        type: true,
        message: 'Il SIUS è già presente a sistema!'
      }
    },
    deposito: Date,
    udienzaData: Date,
    udienzaOra: Date,
    penaInizio: Date,
    penaFine: Date,
    penaFineTipo: {
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
    decorrenza: Date,
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
    accompagnato: {
      type: String,
      trim: true
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
    decizione: {
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
    ],
    procedimento: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Procedimenti'
      }
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, "L'utente è obbligatorio."]
    },
    noteIstanza: String
    // istruttoria: [
    //   {
    //     istruttoriaId: {
    //       type: mongoose.Types.ObjectId
    //     },
    //     sedeIstruttoria: {
    //       type: mongoose.Schema.ObjectId,
    //       ref: 'Sedi'
    //     },
    //     testo: {
    //       type: mongoose.Schema.ObjectId,
    //       ref: 'Testi'
    //     },
    //     dal: {
    //       type: Date,
    //       validate: [
    //         validator.isDate('DD/MM/YYYY'),
    //         'Inserire una data corretta'
    //       ]
    //     },
    //     al: {
    //       type: Date,
    //       validate: [
    //         validator.isDate('DD/MM/YYYY'),
    //         'Inserire una data corretta'
    //       ]
    //     },
    //     presofferto: {
    //       type: Boolean,
    //       default: false
    //     },
    //     ripetuto: {
    //       type: Boolean,
    //       default: false
    //     },
    //     compresa: {
    //       type: Boolean,
    //       default: false
    //     },
    //     inammissibile: {
    //       type: Boolean,
    //       default: false
    //     },
    //     noDati: {
    //       type: Boolean,
    //       default: false
    //     },
    //     immediata: {
    //       type: Boolean,
    //       default: false
    //     },
    //     subdelega: {
    //       type: Boolean,
    //       default: false
    //     },
    //     anni: {
    //       type: Number,
    //       default: 0
    //     },
    //     mesi: {
    //       type: Number,
    //       default: 0
    //     },
    //     giorni: {
    //       type: Number,
    //       default: 0
    //     },
    //     noteIstruttoria: String,
    //     dataEmail: [
    //       {
    //         type: Date
    //       }
    //     ],
    //     dataSollecito: [
    //       {
    //         type: Date
    //       }
    //     ]
    //   }
    // ]
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// INDICI --------------------------------------------------
istanzaUSSchema.index({ slug: 1 });

// Populate the data
istanzaUSSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'istanza',
    select: '-idA -__v'
  }).populate({
    path: 'magistrato',
    select: '-__v -idA -competenza -sostitutoDi'
  });
  next();
});

// HOOK PRE and POST -------------------------------------------------
// PRE
istanzaUSSchema.pre('save', function (next) {
  this.slug = this.aSius + '/' + this.nSius;
  next();
});

// istanzaUSSchema.pre('save', function (next) {
//   let data = new Date(this.udienzaData);
//   console.log('Giorno ', data.getDay());
//   console.log('Mese ', data.getMonth());
//   console.log('Anno ', data.getFullYear());
//   //IstanzaUS.dateFormat(this);
//   next();
// });

// istanzaUSSchema.pre('/^find/', function (next) {
//   IstanzaUS.dateFormat(this);
//   next();
// });

// STATIC methods ---------------------------------------------------
// istanzaUSSchema.statics.dateFormat = function (data) {
//   //this.udienzaData = data.udienzaData.toLocaleDateString('en-US');
//   this.valutatoFino = data.valutatoFino.toLocaleDateString('en-US');
//   this.decorrenza = data.decorrenza.toLocaleDateString('en-US');
// };

// istanzaUSSchema.statics.calcolaYMD = async function (istruttoriaId) {
//   const d = await this.findById(istruttoriaId);

//   const dal = new Date(d.dal);
//   const al = new Date(d.al);

//   const dal1 = dal.getTime();
//   const al1 = al.getTime();

//   let calc;

//   //Check which timestamp is greater
//   if (dal1 > al1) {
//     calc = new Date(dal1 - al1);
//   } else {
//     calc = new Date(al1 - dal1);
//   }

//   const days_passed = Number(Math.abs(calc.getDate()));
//   const months_passed = Number(Math.abs(calc.getMonth() + 1) - 1);
//   const years_passed = Number(Math.abs(calc.getFullYear()) - 1970);

//   await IstanzaUS.findByIdAndUpdate(istruttoriaId, {
//     anni: years_passed,
//     mesi: months_passed,
//     giorni: days_passed
//   });
// };

// istanzaUSSchema.post('save', function (next) {
//   this.constructor.calcolaYMD(this.istruttoriaId);
//   next();
// });

const IstanzaUS = mongoose.model('IstanzaUS', istanzaUSSchema);

module.exports = IstanzaUS;
