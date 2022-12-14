const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.home = appErrorAsync(async (req, res, next) => {
  // 3) Render that template using tour data from 1)
  res.status(200).render('layout', {
    title: 'App Sorveglianza di Verona'
  });
});
