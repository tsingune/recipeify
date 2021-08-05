// Third Party Imports
const express = require('express');

// Project Imports
const {
  deleteRecipe,
  getRecipe,
  getAllRecipe,
  createRecipe,
} = require('./recipeController');
const { protect, restrictTo } = require('../auth/authController');

const router = express.Router();

// Restrict below routes to admin
router.use(protect, restrictTo('user'));

router.route('/').get(getAllRecipe).post(createRecipe);
router.route('/:id').get(getRecipe).delete(deleteRecipe);

module.exports = router;
