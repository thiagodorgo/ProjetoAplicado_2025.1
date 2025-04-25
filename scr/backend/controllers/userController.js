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
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role', 'createdAt'], // Retorna apenas campos relevantes
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(`Erro ao buscar usuários: ${error.message}`);
        next(error); // Passa o erro para o middleware global de tratamento
    }
};

/**
 * @desc    Retrieve a specific user by ID
 * @route   GET /api/users/:id
 * @access  Public
 */
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'name', 'email', 'role', 'createdAt'], // Retorna apenas campos relevantes
        });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(`Erro ao buscar usuário por ID: ${error.message}`);
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
        const { name, email, password, role } = req.body;

        // Validação básica de entrada (pode ser expandida com bibliotecas como joi)
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
        }

        const newUser = await User.create({ name, email, password, role });
        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error(`Erro ao criar usuário: ${error.message}`);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Email já está em uso.' });
        }
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
        const { name, email, role } = req.body;

        // Busca o usuário pelo ID
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Atualiza apenas os campos fornecidos
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        await user.save();

        res.status(200).json({
            message: 'Usuário atualizado com sucesso!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(`Erro ao atualizar usuário: ${error.message}`);
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
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        await user.destroy();
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        console.error(`Erro ao deletar usuário: ${error.message}`);
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