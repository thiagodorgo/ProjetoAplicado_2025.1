const express = require('express');
const router = express.Router();
const {
    getAllTrainings,
    createTraining,
    deleteTraining
} = require('../controllers/trainingController');

// Rotas para Treinamentos
router.get('/', getAllTrainings);
router.post('/', createTraining);
router.delete('/:id', deleteTraining);

module.exports = router;