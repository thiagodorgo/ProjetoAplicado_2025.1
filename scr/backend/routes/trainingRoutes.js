/**
 * Training Routes
 * Defines the routes for managing trainings.
 */

const express = require('express');
const router = express.Router();
const {
    getAllTrainings,
    getTrainingsByEmployeeId,
    createTraining,
    deleteTraining,
} = require('../controllers/trainingController');

// Rotas para Treinamentos
router.get('/', getAllTrainings); // Lista todos os treinamentos
router.get('/:employeeId', getTrainingsByEmployeeId); // Busca treinamentos de um funcionário específico
router.post('/', createTraining); // Cria um novo treinamento
router.delete('/:id', deleteTraining); // Deleta um treinamento pelo ID

module.exports = router;