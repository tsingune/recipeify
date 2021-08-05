// Third Party Imports
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'name is required'],
  },
  user: {
    type: String,
    required: [true, 'A recipe must belongs to a user'],
  },
  URL: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  image: {
    type: String,
    required: [true, 'image is required'],
  },
  publisher: {
    type: String,
    required: [true, 'publisher is required'],
  },
  prepTime: {
    type: Number,
    required: [true, 'prepTime is required'],
  },
  servings: {
    type: Number,
    required: [true, 'servings is required'],
  },
  ingredients: [String],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
