// Third Party Imports
const express = require('express');

// Project Imports
const {
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  updateMe,
  deleteMe,
} = require('./userController');

const {
  signup,
  login,
  protect,
  restrictTo,
  isSignedIn,
} = require('../auth/authController');

const router = express.Router();

router.route('/updateme').patch(protect, updateMe);
router.route('/deleteme').delete(protect, deleteMe);

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/isSignedIn').get(protect, isSignedIn);

// Restrict below routes to admin
router.use(protect, restrictTo('admin'));

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
