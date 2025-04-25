/**
 * Backend.js: Arquivo principal para gerenciar uploads, conexão com banco de dados e cadastro de usuários.
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2/promise'); // Biblioteca para conexão MySQL
const bcrypt = require('bcrypt'); // Para criptografar senhas
const helmet = require('helmet'); // Segurança adicional
const compression = require('compression'); // Compactação de respostas HTTP

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do armazenamento para fotos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde as fotos serão armazenadas
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Gera um nome único para o arquivo
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB por foto
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Apenas imagens são permitidas (jpeg, jpg, png, gif)'));
        }
    },
});

// Configuração do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD || 'password', // Use variáveis de ambiente quando possível
    database: 'project_db', // Substitua pelo nome do seu banco de dados
};

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Adiciona cabeçalhos de segurança
app.use(compression()); // Compactação das respostas HTTP

// Rota para cadastro de usuários
app.post('/api/register', upload.single('photo'), async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const photo = req.file ? req.file.filename : null;

        // Validação dos dados
        if (!username || !email || !password || !photo) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Conexão com o banco de dados
        const connection = await mysql.createConnection(dbConfig);

        // Insere o usuário no banco de dados
        const query = `
            INSERT INTO users (username, email, password, photo_url)
            VALUES (?, ?, ?, ?)
        `;
        await connection.execute(query, [username, email, hashedPassword, photo]);

        // Fecha a conexão com o banco
        await connection.end();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro no servidor. Tente novamente mais tarde.' });
    }
});

// Servir arquivos estáticos na pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: err.message });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});