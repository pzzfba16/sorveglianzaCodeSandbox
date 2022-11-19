const Ente = require('./../models/entiModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllEnti = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'ente';
  }
  const features = new AppFeatures(Ente.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createEnte = appErrorAsync(async (req, res, next) => {
  const results = await Ente.create(req.body);
  res.status(201).json({
    status: 'success',
    results: results.length,

    data: {
      results
    }
  });
});

exports.getEnte = appErrorAsync(async (req, res, next) => {
  const results = await Ente.findById(req.params.id);
  if (!results) {
    return next(new AppError('Ente non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.updateEnte = appErrorAsync(async (req, res, next) => {
  const results = await Ente.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!results) {
    return next(new AppError('Ente non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.deleteEnte = appErrorAsync(async (req, res, next) => {
  const results = await Ente.findByIdAndDelete(req.params.id);
  if (!results) {
    return next(new AppError('Ente non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
});

exports.createAll = appErrorAsync(async (req, res) => {
  const results = await Ente.create(req.body);
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
});
