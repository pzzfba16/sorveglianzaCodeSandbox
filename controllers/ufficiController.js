const Uffici = require('./../models/ufficiModel');
const factory = require('./handlerFactory');

exports.getAllUffici = factory.getAll(Uffici);

exports.createUfficio = factory.createOne(Uffici);

exports.getUfficio = factory.getOne(Uffici);

exports.updateUfficio = factory.updateOne(Uffici);

exports.deleteUfficio = factory.deleteOne(Uffici);
