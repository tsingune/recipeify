const AppError = require('../error/appError');
const APIFeatures = require('./apiFeatures');

const updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!doc) {
      return next(new AppError('No doc found with that ID', 400));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id, {
      useFindAndModify: false,
    });

    if (!doc) {
      return next(new AppError('No doc found with that ID', 400));
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOne =
  (Model, ...populateOptions) =>
  async (req, res, next) => {
    try {
      const query = Model.findById(req.params.id);

      if (populateOptions) {
        populateOptions.forEach((populateField) =>
          query.populate(populateField)
        );
      }

      const doc = await query;

      if (!doc) {
        return next(new AppError('No doc found with that id', 400));
      }

      res.status(200).json({
        status: 'success',
        data: {
          data: doc,
        },
      });
    } catch (err) {
      next(err);
    }
  };

const getAll = (Model) => async (req, res, next) => {
  try {
    const features = new APIFeatures(Model.find(), req.query);
    features.filter().sort().limitFields().paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll,
};
