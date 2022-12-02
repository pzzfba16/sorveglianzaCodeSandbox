const Sedi = require('./../models/sediModel');
const factory = require('./handlerFactory');

exports.getAllSedi = factory.getAll(Sedi);

exports.createSede = factory.createOne(Sedi);

exports.getSede = factory.getOne(Sedi);

exports.updateSede = factory.updateOne(Sedi);

exports.deleteSede = factory.deleteOne(Sedi);

exports.createAll = async (req, res) => {
  try {
    const results = await Sedi.insert(req.body);
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
