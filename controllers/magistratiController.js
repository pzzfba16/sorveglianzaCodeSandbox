const Magistrati = require('./../models/magistratiModel');
const factory = require('./handlerFactory');

exports.getAllMagistrati = factory.getAll(Magistrati);

exports.createMagistrato = factory.createOne(Magistrati);

exports.getMagistrato = factory.getOne(Magistrati);

exports.updateMagistrato = factory.updateOne(Magistrati);

exports.deleteMagistrato = factory.deleteOne(Magistrati);

exports.createAll = async (req, res) => {
  try {
    const results = await Magistrati.insertMany(req.body);
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
