const Esperti = require('./../models/espertiModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllEsperti = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'esperto';
  }
  const features = new AppFeatures(Esperti.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createEsperto = appErrorAsync(async (req, res, next) => {
  const results = await Esperti.create(req.body);
  res.status(201).json({
    status: 'success',
    results: results.length,

    data: {
      results
    }
  });
});

exports.getEsperto = appErrorAsync(async (req, res, next) => {
  const results = await Esperti.findById(req.params.id);
  if (!results) {
    return next(new AppError('Esperto non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.updateEsperto = appErrorAsync(async (req, res, next) => {
  const results = await Esperti.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!results) {
    return next(new AppError('Esperto non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.deleteEsperto = appErrorAsync(async (req, res, next) => {
  const results = await Esperti.findByIdAndDelete(req.params.id);
  if (!results) {
    return next(new AppError('Esperto non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
});

exports.createAll = async (req, res) => {
  try {
    const results = await Esperti.insertMany(req.body);
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
