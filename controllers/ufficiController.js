const Uffici = require('./../models/ufficiModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllUffici = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'ufficio';
  }
  const features = new AppFeatures(Uffici.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createUfficio = appErrorAsync(async (req, res, next) => {
  const results = await Uffici.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      results
    }
  });
});

exports.getUfficio = appErrorAsync(async (req, res, next) => {
  const results = await Uffici.findById(req.params.id);
  if (!results) {
    return next(new AppError('Ufficio non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      results
    }
  });
});

exports.updateUfficio = appErrorAsync(async (req, res, next) => {
  const results = await Uffici.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!results) {
    return next(new AppError('Ufficio non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      results
    }
  });
});

exports.deleteUfficio = appErrorAsync(async (req, res) => {
  await Uffici.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: null
  });
});
