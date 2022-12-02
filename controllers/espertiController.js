const Esperti = require('./../models/espertiModel');
const factory = require('./handlerFactory');

exports.getAllEsperti = factory.getAll(Esperti);

exports.createEsperto = factory.createOne(Esperti);

exports.getEsperto = factory.getOne(Esperti);

exports.updateEsperto = factory.updateOne(Esperti);

exports.deleteEsperto = factory.deleteOne(Esperti);

exports.createAll = async (req, res) => {
  try {
    const results = await Esperti.insertMany(req.body);
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
