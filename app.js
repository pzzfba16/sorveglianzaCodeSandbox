// Declaration of default modules
const express = require('express'); //framework for Node.js
const path = require('path'); // working with file and directory paths
const cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies with an object keyed by the cookie names
const morgan = require('morgan'); //HTTP request logger middleware for node.js
const rateLimit = require('express-rate-limit'); //Add dynamic rate-limiting
const helmet = require('helmet'); //Helmet helps you secure your Express apps by setting various HTTP headers
const mongoSanitize = require('express-mongo-sanitize'); //Middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection
const xss = require('xss-clean'); //Filter input from users to prevent XSS attacks
// const hpp = require('hpp'); //Middleware to protect against HTTP Parameter Pollution attacks
const mongoose = require('mongoose'); //Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment

// Declaration of owen modules
const AppError = require('./helpers/appError'); //Module for throw errors
const globalErrorHandler = require('./controllers/errorController'); //Modules for global error

// Routers
const viewsRouter = require('./routes/viewsRouter');
const usersRouter = require('./routes/userRouter');
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
const richiesteRouter = require('./routes/richiesteRouter');

var app = express();

// View Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES --------------------------------------------------------
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Troppe richieste a questo indirizzo IP, Riprova tra un'ora!"
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price'
//     ]
//   })
// );

// 2) ROUTES ---------------------------------------------------------------
app.use('/', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/uffici', ufficiRouter);
app.use('/api/posgiu', posgiuRouter);
app.use('/api/avvocato', avvocatoRouter);
app.use('/api/enti', entiRouter);
app.use('/api/browserposta', browserPostaRouter);
app.use('/api/decisioni', decisioneRouter);
app.use('/api/esperti', espertiRouter);
app.use('/api/istanze', istanzeRoter);
app.use('/api/magistrati', magistratiRouter);
app.use('/api/procuratori', procuratoriRouter);
app.use('/api/organi', organiRouter);
app.use('/api/sedi', sediRouter);
app.use('/api/richieste', richiesteRouter);

// 3 ERROR HANDLER --------------------------------------------------
// Routes not found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// Global errors
app.use(globalErrorHandler);

// 4) DATABASE CONNECTION ---------------------------------------------------
const dbString =
  'mongodb+srv://userFabio:FVcjQATT.7563@clusterappsorveglianza.bbp0dnd.mongodb.net/dbSorveglianza?retryWrites=true&w=majority';
mongoose
  .connect(dbString)
  .then(() => console.log('connessione al DB riuscita'));

// 5) RUN SERVER --------------------------------------------------------------
const port = process.env.PORT || 8080;
var listener = app.listen(port, function () {
  console.log('Listening on port ' + listener.address().port);
});

// 6) UNCATCH ERROR HANDLER ---------------------------------------------------------
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  app.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  app.close(() => {
    console.log('💥 Process terminated!');
  });
});
