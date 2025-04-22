// app.js: Arquivo principal do servidor
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes'); // Rotas para cursos
const trainingRoutes = require('./routes/trainingRoutes'); // Rotas para treinamentos
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandlers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(helmet()); // Segurança
app.use(cors()); // Permitir CORS
app.use(morgan('dev')); // Logs de requisições HTTP
app.use(bodyParser.json()); // Parse de JSON no body das requisições

// Rotas
app.use('/api/users', userRoutes); // Rotas de usuários
app.use('/api/courses', courseRoutes); // Rotas de cursos
app.use('/api/trainings', trainingRoutes); // Rotas de treinamentos

// Middleware para rotas não encontradas
app.use(notFoundHandler);

// Middleware para tratamento global de erros
app.use(errorHandler);

// Middleware adicional para monitoramento (exemplo de upgrade)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} - ${req.url}`);
    next();
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});