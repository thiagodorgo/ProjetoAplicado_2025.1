const getAllTrainings = (req, res) => {
    // Lógica para buscar todos os treinamentos
    res.json([]);
};

const createTraining = (req, res) => {
    // Lógica para criar um treinamento
    res.json(req.body);
};

const deleteTraining = (req, res) => {
    // Lógica para deletar um treinamento
    res.json({ message: 'Treinamento deletado com sucesso' });
};

module.exports = {
    getAllTrainings,
    createTraining,
    deleteTraining
};