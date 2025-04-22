/**
 * User Routes
 * This file defines the routes for user management.
 */
const express = require('express');
const { 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Retrieve all users
 * @access  Public
 */
router.get('/', getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Retrieve a specific user by ID
 * @access  Public
 */
router.get('/:id', getUserById);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public
 */
router.post('/', createUser);

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