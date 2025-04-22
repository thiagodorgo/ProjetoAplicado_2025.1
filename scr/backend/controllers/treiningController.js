// trainingController.js

// Função para buscar todos os treinamentos
const getAllTrainings = (req, res) => {
    // Lógica para buscar todos os treinamentos do banco de dados (exemplo substituído por dados simulados)
    const trainings = [
        {
            id: 1,
            employeeId: 101,
            courseName: "Curso de Liderança",
            completion_date: "2025-01-15",
            expiration_date: "2028-01-15",
        },
        {
            id: 2,
            employeeId: 102,
            courseName: "Curso de Primeiros Socorros",
            completion_date: "2024-12-10",
            expiration_date: "2026-12-10",
        },
    ]; // Substituir por lógica real do banco de dados

    res.status(200).json({ trainings });
};

// Função para buscar treinamentos por ID do funcionário
const getTrainingsByEmployeeId = (req, res) => {
    const { employeeId } = req.params;

    // Exemplo de lógica para buscar dados do banco (substituir com ORM/DB)
    const trainings = [
        {
            id: 1,
            courseName: "Curso de Liderança",
            completion_date: "2025-01-15",
            expiration_date: "2028-01-15",
        },
        {
            id: 2,
            courseName: "Curso de Primeiros Socorros",
            completion_date: "2024-12-10",
            expiration_date: "2026-12-10",
        },
    ]; // Substituir por busca real no banco de dados.

    // Filtro para treinamentos do funcionário
    const employeeTrainings = trainings.filter(
        (training) => training.employeeId === parseInt(employeeId)
    );

    res.status(200).json({
        employeeId,
        trainings: employeeTrainings,
    });
};

// Função para criar um novo treinamento
const addTraining = (req, res) => {
    const { employeeId, courseId, completion_date } = req.body;

    if (!employeeId || !courseId || !completion_date) {
        return res.status(400).json({ message: "Dados incompletos" });
    }

    // Lógica para salvar no banco de dados (substituir com ORM/DB)
    const expiration_date = new Date(completion_date);
    expiration_date.setFullYear(expiration_date.getFullYear() + 2); // Exemplo de cálculo de validade de 2 anos

    const newTraining = {
        id: Math.floor(Math.random() * 1000), // Simula um ID gerado automaticamente
        employeeId,
        courseId,
        completion_date,
        expiration_date,
    };

    res.status(201).json({
        message: "Treinamento registrado com sucesso!",
        training: newTraining,
    });
};

// Função para deletar um treinamento
const deleteTraining = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID do treinamento não fornecido" });
    }

    // Lógica para deletar do banco de dados (substituir com ORM/DB)
    res.status(200).json({ message: `Treinamento com ID ${id} deletado com sucesso` });
};

// Exportação das funções
module.exports = {
    getAllTrainings,
    getTrainingsByEmployeeId,
    addTraining,
    deleteTraining,
};