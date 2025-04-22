// app.js: Arquivo principal do servidor
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes'); // Rotas de usuários
const courseRoutes = require('./routes/courseRoutes'); // Rotas de cursos
const trainingRoutes = require('./routes/trainingRoutes'); // Rotas de treinamentos
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandlers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(helmet()); // Segurança
app.use(cors()); // Permitir CORS
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Logs detalhados no ambiente de desenvolvimento
}
app.use(express.json()); // Parse de JSON no body das requisições

// Rotas
app.use('/api/users', userRoutes); // Rotas de usuários
app.use('/api/courses', courseRoutes); // Rotas de cursos
app.use('/api/trainings', trainingRoutes); // Rotas de treinamentos

// Middleware para monitoramento (mover para um arquivo separado)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} - ${req.url}`);
    next();
});

// Middleware para rotas não encontradas
app.use(notFoundHandler);

// Middleware para tratamento global de erros
app.use(errorHandler);

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
}).on('error', (err) => {
    console.error(`❌ Erro ao iniciar o servidor: ${err.message}`);
});