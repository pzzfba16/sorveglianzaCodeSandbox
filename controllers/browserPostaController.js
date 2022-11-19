const BrowserPostaModel = require('./../models/browserPostaModel');
const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

exports.getAllBrowser = appErrorAsync(async (req, res, next) => {
  if (!req.query) {
    req.query.sort = 'ente';
  }
  const features = new AppFeatures(BrowserPostaModel.find(), req.query).sort();
  const results = await features.query;
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

exports.createBrowser = appErrorAsync(async (req, res, next) => {
  const results = await BrowserPostaModel.create(req.body);
  res.status(201).json({
    status: 'success',
    results: results.length,

    data: {
      results
    }
  });
});

exports.getBrowser = appErrorAsync(async (req, res, next) => {
  const results = await BrowserPostaModel.findById(req.params.id);
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

exports.updateBrowser = appErrorAsync(async (req, res, next) => {
  const results = await BrowserPostaModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    }
  );
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

exports.deleteBrowser = appErrorAsync(async (req, res, next) => {
  const results = await BrowserPostaModel.findByIdAndDelete(req.params.id);
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
  const results = await BrowserPostaModel.create(req.body);
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
});
