const AppFeatures = require('./../helpers/appFeatures');
const appErrorAsync = require('./../helpers/appErrorAsync');
const AppError = require('./../helpers/appError');

// Get all the data
exports.getAll = (Model) =>
  appErrorAsync(async (req, res, next) => {
    // Add the features to the data
    const features = new AppFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    // Send responce
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

// Get
exports.getOne = (Model, popOptions) =>
  appErrorAsync(async (req, res, next) => {
    // Find the document
    let query = await Model.findById(req.params.id);
    // Add the population documents
    if (popOptions) query = query.populate(popOptions);
    // Run the query
    const doc = await query;
    // If no data
    if (!doc) {
      return next(new AppError('Istanza non trovato con ID', 404));
    }
    // Send responce
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

// Create a new document
exports.createOne = (Model) =>
  appErrorAsync(async (req, res, next) => {
    // Create the cocument
    const doc = await Model.create(req.body);
    // send responce
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// Update a document
exports.updateOne = (Model) =>
  appErrorAsync(async (req, res, next) => {
    // Update the document
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    // Document not found
    if (!doc) {
      return next(new AppError('Istanza non trovato con ID', 404));
    }
    // Send responce
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// Delete a document
exports.deleteOne = (Model) =>
  appErrorAsync(async (req, res, next) => {
    // Delete the document
    const doc = await Model.findByIdAndDelete(req.params.id);
    // Document not found
    if (!doc) {
      return next(new AppError('Istanza non trovato con ID', 404));
    }
    // Send responce
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
