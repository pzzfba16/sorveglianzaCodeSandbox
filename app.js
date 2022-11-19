var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// Routes handlers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ufficiRouter = require('./routes/ufficiRouter');
const posgiuRouter = require('./routes/posGiuRouter');
const avvocatoRouter = require('./routes/avvocatiRouter');
const entiRouter = require('./routes/entiRouter');
const browserPostaRouter = require('./routes/browserPostaRouter');
const decisioneRouter = require('./routes/decisioneRouter');
const espertiRouter = require('./routes/espertiRouter');
const istanzeRoter = require('./routes/istanzeRouter');
const magistratiRouter = require('./routes/magistratiRouter');
const procuratoriRouter = require('./routes/procuratoriRouter');
const organiRouter = require('./routes/organiRouter');
const sediRouter = require('./routes/sediRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes definition
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/uffici', ufficiRouter);
app.use('/posgiu', posgiuRouter);
app.use('/avvocato', avvocatoRouter);
app.use('/enti', entiRouter);
app.use('/browserposta', browserPostaRouter);
app.use('/decisioni', decisioneRouter);
app.use('/esperti', espertiRouter);
app.use('/istanze', istanzeRoter);
app.use('/magistrati', magistratiRouter);
app.use('/procuratori', procuratoriRouter);
app.use('/organi', organiRouter);
app.use('/sedi', sediRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

const dbString =
  'mongodb+srv://userFabio:FVcjQATT.7563@clusterappsorveglianza.bbp0dnd.mongodb.net/dbSorveglianza?retryWrites=true&w=majority';

mongoose
  .connect(dbString)
  .then(() => console.log('connessione al DB riuscita'));

const port = process.env.PORT || 8080;

var listener = app.listen(port, function () {
  console.log('Listening on port ' + listener.address().port);
});
