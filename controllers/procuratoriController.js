const Procuratori = require('./../models/procuratoriModel');
const factory = require('./handlerFactory');

exports.getAllProcuratori = factory.getAll(Procuratori);

exports.createProcuratore = factory.createOne(Procuratori);

exports.getProcuratore = factory.getOne(Procuratori);

exports.updateProcuratore = factory.updateOne(Procuratori);

exports.deleteProcuratore = factory.deleteOne(Procuratori);

exports.createAll = async (req, res) => {
  try {
    const results = await Procuratori.insertMany(req.body);
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
