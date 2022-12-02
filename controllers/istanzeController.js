const Istanze = require('./../models/istanzeModel');
const factory = require('./handlerFactory');

exports.getAllIstanze = factory.getAll(Istanze);

exports.createIstanza = factory.createOne(Istanze);

exports.getIstanza = factory.getOne(Istanze);

exports.updateIstanza = factory.updateOne(Istanze);

exports.deleteIstanza = factory.deleteOne(Istanze);

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
