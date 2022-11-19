const Avvocato = require('./../models/avvocatoModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllAvvocato = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'avvocato';
  }
  const features = new AppFeatures(Avvocato.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createAvvocato = appErrorAsync(async (req, res, next) => {
  const results = await Avvocato.create(req.body);
  res.status(201).json({
    status: 'success',
    results: results.length,

    data: {
      results
    }
  });
});

exports.getAvvocato = appErrorAsync(async (req, res, next) => {
  const results = await Avvocato.findById(req.params.id);
  if (!results) {
    return next(new AppError('Avvocato non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.updateAvvocato = appErrorAsync(async (req, res, next) => {
  const results = await Avvocato.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!results) {
    return next(new AppError('Avvocato non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.deleteAvvocato = appErrorAsync(async (req, res, next) => {
  const results = await Avvocato.findByIdAndDelete(req.params.id);
  if (!results) {
    return next(new AppError('Avvocato non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
});

exports.createAll = async (req, res) => {
  try {
    const results = await Avvocato.create(req.body);
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
