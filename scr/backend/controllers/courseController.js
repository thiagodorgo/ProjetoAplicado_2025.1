/**
 * Course Controller
 * Handles all logic related to course operations.
 */

const Course = require('../models/Course');

/**
 * @desc    Retrieve all courses
 * @route   GET /api/courses
 * @access  Public
 */
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.findAll({
            attributes: ['id', 'name', 'duration_in_hours', 'validity_in_years', 'description'],
        });
        res.status(200).json(courses);
    } catch (error) {
        console.error(`Erro ao buscar cursos: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Retrieve a specific course by ID
 * @route   GET /api/courses/:id
 * @access  Public
 */
const getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id, {
            attributes: ['id', 'name', 'duration_in_hours', 'validity_in_years', 'description'],
        });
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error(`Erro ao buscar curso por ID: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Create a new course
 * @route   POST /api/courses
 * @access  Public
 */
const createCourse = async (req, res, next) => {
    try {
        const { name, duration_in_hours, validity_in_years, description } = req.body;

        // Validação básica de entrada
        if (!name || !duration_in_hours || !validity_in_years) {
            return res.status(400).json({ error: 'Campos obrigatórios: name, duration_in_hours, validity_in_years' });
        }

        const newCourse = await Course.create({ name, duration_in_hours, validity_in_years, description });
        res.status(201).json({
            message: 'Curso criado com sucesso!',
            course: newCourse,
        });
    } catch (error) {
        console.error(`Erro ao criar curso: ${error.message}`);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'O nome do curso já está em uso.' });
        }
        next(error);
    }
};

/**
 * @desc    Update a specific course by ID
 * @route   PUT /api/courses/:id
 * @access  Public
 */
const updateCourse = async (req, res, next) => {
    try {
        const { name, duration_in_hours, validity_in_years, description } = req.body;

        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }

        // Atualiza apenas os campos fornecidos
        course.name = name || course.name;
        course.duration_in_hours = duration_in_hours || course.duration_in_hours;
        course.validity_in_years = validity_in_years || course.validity_in_years;
        course.description = description || course.description;
        await course.save();

        res.status(200).json({
            message: 'Curso atualizado com sucesso!',
            course,
        });
    } catch (error) {
        console.error(`Erro ao atualizar curso: ${error.message}`);
        next(error);
    }
};

/**
 * @desc    Delete a specific course by ID
 * @route   DELETE /api/courses/:id
 * @access  Public
 */
const deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        await course.destroy();
        res.status(200).json({ message: 'Curso deletado com sucesso!' });
    } catch (error) {
        console.error(`Erro ao deletar curso: ${error.message}`);
        next(error);
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};