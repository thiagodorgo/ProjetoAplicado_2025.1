const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} = require('../controllers/courseController');

// Rotas para Cursos
router.get('/', getAllCourses); // Retorna todos os cursos
router.get('/:id', getCourseById); // Retorna um curso específico pelo ID
router.post('/', createCourse); // Cria um novo curso
router.put('/:id', updateCourse); // Atualiza um curso existente pelo ID
router.delete('/:id', deleteCourse); // Deleta um curso pelo ID

module.exports = router;