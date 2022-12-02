const Richieste = require('./../models/richiesteModel');
const factory = require('./handlerFactory');

exports.getAllRichieste = factory.getAll(Richieste);

exports.createRichiesta = factory.createOne(Richieste);

exports.getRichiesta = factory.getOne(Richieste);

exports.updateRichiesta = factory.updateOne(Richieste);

exports.deleteRichiesta = factory.deleteOne(Richieste);

exports.createAll = async (req, res) => {
  try {
    const results = await Richieste.insertMany(req.body);
    res.status(200).json({
      status: 'success',
      results: results.length,
      data: results
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
