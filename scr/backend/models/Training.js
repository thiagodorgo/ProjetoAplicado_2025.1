const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./Course'); // Relacionamento com o modelo Course

const Training = sequelize.define('Training', {
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course, // Relacionamento com o modelo Course
            key: 'id',
        },
        validate: {
            isInt: {
                msg: 'O ID do curso deve ser um número inteiro.',
            },
        },
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'O ID do funcionário deve ser um número inteiro.',
            },
        },
    },
    completion_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'A data de conclusão deve ser uma data válida.',
            },
        },
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: true, // Permitido ser nulo inicialmente, será calculado com base no curso
        validate: {
            isDate: {
                msg: 'A data de expiração deve ser uma data válida.',
            },
        },
    },
}, {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    tableName: 'trainings', // Nome da tabela no banco de dados
});

// Hook para calcular a data de expiração automaticamente
Training.beforeCreate(async (training) => {
    if (!training.expiration_date) {
        // Buscar o curso relacionado para obter a validade
        try {
            const course = await Course.findByPk(training.courseId);
            if (course) {
                const expirationDate = new Date(training.completion_date);
                expirationDate.setFullYear(expirationDate.getFullYear() + course.validity_in_years);
                training.expiration_date = expirationDate;
            } else {
                throw new Error('Curso não encontrado para o ID fornecido.');
            }
        } catch (error) {
            throw new Error(`Erro ao calcular a data de expiração: ${error.message}`);
        }
    }
});

module.exports = Training;