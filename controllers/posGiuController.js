const PosGiu = require('./../models/posGiuModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllPosGiu = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'posizioneGiuridica';
  }
  const features = new AppFeatures(PosGiu.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createPosGiu = appErrorAsync(async (req, res, next) => {
  const results = await PosGiu.create(req.body);
  res.status(201).json({
    status: 'success',
    results: results.length,

    data: {
      results
    }
  });
});

exports.getPosGiu = appErrorAsync(async (req, res, next) => {
  const results = await PosGiu.findById(req.params.id);
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

exports.updatePosGiu = appErrorAsync(async (req, res, next) => {
  const results = await PosGiu.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deletePosGiu = appErrorAsync(async (req, res, next) => {
  const results = await PosGiu.findByIdAndDelete(req.params.id);
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
    const results = await PosGiu.insertMany(req.body);
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
