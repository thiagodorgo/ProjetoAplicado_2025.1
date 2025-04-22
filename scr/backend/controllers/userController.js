/**
 * User Controller
 * Handles all logic related to user operations.
 */

const User = require('../models/User');

/**
 * @desc    Retrieve all users
 * @route   GET /api/users
 * @access  Public
 */
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(`Error fetching users: ${error.message}`);
        next(error); // Pass the error to the global error handler
    }
};

/**
 * @desc    Retrieve a specific user by ID
 * @route   GET /api/users/:id
 * @access  Public
 */
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(`Error fetching user by ID: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Public
 */
const createUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const newUser = await User.create({ name, email });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Update a specific user by ID
 * @route   PUT /api/users/:id
 * @access  Public
 */
const updateUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error(`Error updating user: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Delete a specific user by ID
 * @route   DELETE /api/users/:id
 * @access  Public
 */
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(`Error deleting user: ${error.message}`);
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};