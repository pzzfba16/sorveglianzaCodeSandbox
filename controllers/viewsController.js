const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.home = appErrorAsync(async (req, res, next) => {
  res.render('index', { title: 'Ufficio di Sorveglianza di Verona' });
});
