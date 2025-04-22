const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome do curso não pode estar vazio.'
            },
            len: {
                args: [3, 100],
                msg: 'O nome do curso deve ter entre 3 e 100 caracteres.'
            }
        }
    },
    duration_in_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'A duração deve ser um número inteiro.'
            },
            min: {
                args: 1,
                msg: 'A duração mínima deve ser de 1 hora.'
            }
        }
    },
    validity_in_years: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'A validade deve ser um número inteiro.'
            },
            min: {
                args: 1,
                msg: 'A validade mínima deve ser de 1 ano.'
            },
            max: {
                args: 10,
                msg: 'A validade máxima deve ser de 10 anos.'
            }
        }
    }
}, {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    tableName: 'courses' // Nome da tabela no banco de dados
});

module.exports = Course;