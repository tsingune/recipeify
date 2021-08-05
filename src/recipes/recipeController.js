/* eslint-disable node/no-unsupported-features/es-syntax */
const Recipe = require('./recipeModel');

const { deleteOne, getAll, getOne } = require('../utils/handlerFactory');

const createRecipe = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const doc = await Recipe.create(req.body);

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

const deleteRecipe = deleteOne(Recipe);
const getRecipe = getOne(Recipe);
const getAllRecipe = getAll(Recipe);

module.exports = {
  deleteRecipe,
  getRecipe,
  getAllRecipe,
  createRecipe,
};
