/**
 * Routes for User Management
 */
const express = require('express');
const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Retrieve all users
 * @access  Public
 */
router.get('/', getAllUsers);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public
 */
router.post('/', createUser);

/**
 * @route   GET /api/users/:id
 * @desc    Retrieve a specific user by ID
 * @access  Public
 */
router.get('/:id', getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update a specific user by ID
 * @access  Public
 */
router.put('/:id', updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a specific user by ID
 * @access  Public
 */
router.delete('/:id', deleteUser);

module.exports = router;