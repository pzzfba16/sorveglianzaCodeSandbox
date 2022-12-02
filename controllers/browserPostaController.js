const BrowserPostaModel = require('./../models/browserPostaModel');
const factory = require('./handlerFactory');

exports.getAllBrowser = factory.getAll(BrowserPostaModel);

exports.createBrowser = factory.createOne(BrowserPostaModel);

exports.getBrowser = factory.getOne(BrowserPostaModel);

exports.updateBrowser = factory.updateOne(BrowserPostaModel);

exports.deleteBrowser = factory.deleteOne(BrowserPostaModel);

exports.createAll = async (req, res) => {
  const results = await BrowserPostaModel.create(req.body);
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: null
  });
};
