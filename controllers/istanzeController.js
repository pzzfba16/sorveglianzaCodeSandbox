const Istanze = require('./../models/istanzeModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllIstanze = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'istanza';
  }
  const features = new AppFeatures(Istanze.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createIstanza = appErrorAsync(async (req, res, next) => {
  const results = await Istanze.create(req.body);
  res.status(201).json({
    status: 'success',
    results: results.length,

    data: {
      results
    }
  });
});

exports.getIstanza = appErrorAsync(async (req, res, next) => {
  const results = await Istanze.findById(req.params.id);
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

exports.updateIstanza = appErrorAsync(async (req, res, next) => {
  const results = await Istanze.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteIstanza = appErrorAsync(async (req, res, next) => {
  const results = await Istanze.findByIdAndDelete(req.params.id);
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
    const results = await Istanze.insertMany(req.body);
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
