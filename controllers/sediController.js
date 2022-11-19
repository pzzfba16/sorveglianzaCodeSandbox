const Sedi = require('./../models/sediModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllSedi = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'sede';
  }
  const features = new AppFeatures(Sedi.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createSede = appErrorAsync(async (req, res, next) => {
  const results = await Sedi.create(req.body);
  res.status(201).json({
    status: 'success',
    results: results.length,

    data: {
      results
    }
  });
});

exports.getSede = appErrorAsync(async (req, res, next) => {
  const results = await Sedi.findById(req.params.id);
  if (!results) {
    return next(new AppError('Posizione giuridica non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.updateSede = appErrorAsync(async (req, res, next) => {
  const results = await Sedi.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!results) {
    return next(new AppError('Posizione giuridica non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.deleteSede = appErrorAsync(async (req, res, next) => {
  const results = await Sedi.findByIdAndDelete(req.params.id);
  if (!results) {
    return next(new AppError('Ente non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
});

exports.createAll = async (req, res) => {
  try {
    const results = await Sedi.insert(req.body);
    res.status(200).json({
      status: 'success',
      results: results.length,
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
