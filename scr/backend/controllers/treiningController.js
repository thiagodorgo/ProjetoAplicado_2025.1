/**
 * Training Controller
 * Handles all logic related to training operations.
 */

const Training = require('../models/Training');
const Course = require('../models/Course');

/**
 * @desc    Retrieve all trainings
 * @route   GET /api/trainings
 * @access  Public
 */
const getAllTrainings = async (req, res, next) => {
    try {
        const trainings = await Training.findAll({
            attributes: ['id', 'employeeId', 'courseId', 'completion_date', 'expiration_date', 'status'],
            include: {
                model: Course,
                attributes: ['name', 'duration_in_hours', 'validity_in_years'],
            },
        });
        res.status(200).json(trainings);
    } catch (error) {
        console.error(`Erro ao buscar treinamentos: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Retrieve trainings by Employee ID
 * @route   GET /api/trainings/:employeeId
 * @access  Public
 */
const getTrainingsByEmployeeId = async (req, res, next) => {
    try {
        const { employeeId } = req.params;
        const trainings = await Training.findAll({
            where: { employeeId },
            attributes: ['id', 'courseId', 'completion_date', 'expiration_date', 'status'],
            include: {
                model: Course,
                attributes: ['name', 'duration_in_hours', 'validity_in_years'],
            },
        });
        if (trainings.length === 0) {
            return res.status(404).json({ error: 'Nenhum treinamento encontrado para este funcionário.' });
        }
        res.status(200).json(trainings);
    } catch (error) {
        console.error(`Erro ao buscar treinamentos por Employee ID: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Create a new training
 * @route   POST /api/trainings
 * @access  Public
 */
const createTraining = async (req, res, next) => {
    try {
        const { employeeId, courseId, completion_date } = req.body;

        // Validação básica de entrada
        if (!employeeId || !courseId || !completion_date) {
            return res.status(400).json({ error: 'Campos obrigatórios: employeeId, courseId, completion_date' });
        }

        // Verifica se o curso existe
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }

        // Calcula a data de expiração
        const expirationDate = new Date(completion_date);
        expirationDate.setFullYear(expirationDate.getFullYear() + course.validity_in_years);

        const newTraining = await Training.create({
            employeeId,
            courseId,
            completion_date,
            expiration_date: expirationDate,
            status: 'upcoming',
        });

        res.status(201).json({
            message: 'Treinamento criado com sucesso!',
            training: newTraining,
        });
    } catch (error) {
        console.error(`Erro ao criar treinamento: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Delete a training by ID
 * @route   DELETE /api/trainings/:id
 * @access  Public
 */
const deleteTraining = async (req, res, next) => {
    try {
        const { id } = req.params;

        const training = await Training.findByPk(id);
        if (!training) {
            return res.status(404).json({ error: 'Treinamento não encontrado.' });
        }

        await training.destroy();
        res.status(200).json({ message: 'Treinamento deletado com sucesso!' });
    } catch (error) {
        console.error(`Erro ao deletar treinamento: ${error.message}`);
        next(error);
    }
};

module.exports = {
    getAllTrainings,
    getTrainingsByEmployeeId,
    createTraining,
    deleteTraining,
};