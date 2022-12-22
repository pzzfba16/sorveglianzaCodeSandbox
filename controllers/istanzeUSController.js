const IstanzeUS = require('./../models/istanzeUSModel');
const factory = require('./handlerFactory');

exports.getAllIstanze = factory.getAll(IstanzeUS);

exports.createIstanza = factory.createOne(IstanzeUS);

exports.getIstanza = factory.getOne(IstanzeUS);

exports.updateIstanza = factory.updateOne(IstanzeUS);

exports.deleteIstanza = factory.deleteOne(IstanzeUS);
