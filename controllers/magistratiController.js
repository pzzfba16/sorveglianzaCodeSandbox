const Magistrati = require('./../models/magistratiModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllMagistrati = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'magistrato';
  }
  const features = new AppFeatures(Magistrati.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createMagistrato = appErrorAsync(async (req, res, next) => {
  const results = await Magistrati.create(req.body);
  res.status(201).json({
    status: 'success',
    results: results.length,

    data: {
      results
    }
  });
});

exports.getMagistrato = appErrorAsync(async (req, res, next) => {
  const results = await Magistrati.findById(req.params.id);
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

exports.updateMagistrato = appErrorAsync(async (req, res, next) => {
  const results = await Magistrati.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteMagistrato = appErrorAsync(async (req, res, next) => {
  const results = await Magistrati.findByIdAndDelete(req.params.id);
  if (!results) {
    return next(new AppError('Istanza non trovato con ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
});

exports.createAll = async (req, res) => {
  try {
    const results = await Magistrati.insertMany(req.body);
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
