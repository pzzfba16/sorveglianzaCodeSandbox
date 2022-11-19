const Decisione = require('./../models/decicioneModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllDecisioni = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'decisione';
  }
  const features = new AppFeatures(Decisione.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createDecisione = appErrorAsync(async (req, res, next) => {
  const results = await Decisione.create(req.body);
  res.status(201).json({
    status: 'success',
    results: results.length,

    data: {
      results
    }
  });
});

exports.getDecisione = appErrorAsync(async (req, res, next) => {
  const results = await Decisione.findById(req.params.id);
  if (!results) {
    return next(new AppError('Decisione non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.updateDecisione = appErrorAsync(async (req, res, next) => {
  const results = await Decisione.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!results) {
    return next(new AppError('Decisione non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.deleteDecisione = appErrorAsync(async (req, res, next) => {
  const results = await Decisione.findByIdAndDelete(req.params.id);
  if (!results) {
    return next(new AppError('Decisione non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
});

exports.createAll = appErrorAsync(async (req, res) => {
  const results = await Decisione.create(req.body);
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
});
