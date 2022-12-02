const Decisione = require('./../models/decicioneModel');
const factory = require('./handlerFactory');

exports.getAllDecisioni = factory.getAll(Decisione);

exports.createDecisione = factory.createOne(Decisione);

exports.getDecisione = factory.getOne(Decisione);

exports.updateDecisione = factory.updateOne(Decisione);

exports.deleteDecisione = factory.deleteOne(Decisione);

exports.createAll = async (req, res) => {
  const results = await Decisione.create(req.body);
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: results
  });
};
