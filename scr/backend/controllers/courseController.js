const getAllCourses = (req, res) => {
    // Lógica para buscar todos os cursos
    res.json([]);
};

const getCourseById = (req, res) => {
    // Lógica para buscar um curso específico
    res.json({});
};

const createCourse = (req, res) => {
    // Lógica para criar um curso
    res.json(req.body);
};

const updateCourse = (req, res) => {
    // Lógica para atualizar um curso
    res.json(req.body);
};

const deleteCourse = (req, res) => {
    // Lógica para deletar um curso
    res.json({ message: 'Curso deletado com sucesso' });
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};