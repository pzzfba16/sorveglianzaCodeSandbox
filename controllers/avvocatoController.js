const Avvocato = require('./../models/avvocatoModel');
const factory = require('./handlerFactory');

exports.getAllAvvocato = factory.getAll(Avvocato);

exports.createAvvocato = factory.createOne(Avvocato);

exports.getAvvocato = factory.getOne(Avvocato);

exports.updateAvvocato = factory.updateOne(Avvocato);

exports.deleteAvvocato = factory.deleteOne(Avvocato);

exports.createAll = async (req, res) => {
  try {
    const results = await Avvocato.create(req.body);
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
