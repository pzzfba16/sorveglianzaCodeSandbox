const Organi = require('./../models/organiModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllOrgani = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'Organo';
  }
  const features = new AppFeatures(Organi.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createOrgano = appErrorAsync(async (req, res, next) => {
  const results = await Organi.create(req.body);
  res.status(201).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.getOrgano = appErrorAsync(async (req, res, next) => {
  const results = await Organi.findById(req.params.id);
  if (!results) {
    return next(new AppError('Istanza non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.updateOrgano = appErrorAsync(async (req, res, next) => {
  const results = await Organi.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!results) {
    return next(new AppError('Istanza non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.deleteOrgano = appErrorAsync(async (req, res, next) => {
  const results = await Organi.findByIdAndDelete(req.params.id);
  if (!results) {
    return next(new AppError('Istanza non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
});

exports.createAll = appErrorAsync(async (req, res) => {
  const results = await Organi.insertMany(req.body);
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
});
