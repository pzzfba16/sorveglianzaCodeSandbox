const Organi = require('./../models/organiModel');
const factory = require('./handlerFactory');

exports.getAllOrgani = factory.getAll(Organi);

exports.createOrgano = factory.createOne(Organi);

exports.getOrgano = factory.getOne(Organi);

exports.updateOrgano = factory.updateOne(Organi);

exports.deleteOrgano = factory.deleteOne(Organi);

exports.createAll = async (req, res) => {
  const results = await Organi.insertMany(req.body);
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: results
  });
};
