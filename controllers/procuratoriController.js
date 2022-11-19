const Procuratori = require('./../models/procuratoriModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllProcuratori = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'procuratore';
  }
  const features = new AppFeatures(Procuratori.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createProcuratore = appErrorAsync(async (req, res, next) => {
  const results = await Procuratori.create(req.body);
  res.status(201).json({
    status: 'success',
    results: results.length,

    data: {
      results
    }
  });
});

exports.getProcuratore = appErrorAsync(async (req, res, next) => {
  const results = await Procuratori.findById(req.params.id);
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

exports.updateProcuratore = appErrorAsync(async (req, res, next) => {
  const results = await Procuratori.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteProcuratore = appErrorAsync(async (req, res, next) => {
  const results = await Procuratori.findByIdAndDelete(req.params.id);
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
    const results = await Procuratori.insertMany(req.body);
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
