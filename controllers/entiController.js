const Ente = require('./../models/entiModel');
const factory = require('./handlerFactory');

exports.getAllEnti = factory.getAll(Ente);

exports.createEnte = factory.createOne(Ente);

exports.getEnte = factory.getOne(Ente);

exports.updateEnte = factory.updateOne(Ente);

exports.deleteEnte = factory.deleteOne(Ente);

exports.createAll = async (req, res) => {
  const results = await Ente.create(req.body);
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
};
