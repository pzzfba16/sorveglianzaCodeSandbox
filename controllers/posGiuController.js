const PosGiu = require('./../models/posGiuModel');
const factory = require('./handlerFactory');

exports.getAllPosGiu = factory.getAll(PosGiu);

exports.createPosGiu = factory.createOne(PosGiu);

exports.getPosGiu = factory.getOne(PosGiu);

exports.updatePosGiu = factory.updateOne(PosGiu);

exports.deletePosGiu = factory.deleteOne(PosGiu);

exports.createAll = async (req, res) => {
  try {
    const results = await PosGiu.insertMany(req.body);
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
