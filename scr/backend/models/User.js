/**
 * User Model
 * This file defines the User schema using Sequelize ORM.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuração de conexão com o banco

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'O nome não pode estar vazio.',
                },
                len: {
                    args: [2, 100],
                    msg: 'O nome deve ter entre 2 e 100 caracteres.',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Este email já está cadastrado.',
            },
            validate: {
                isEmail: {
                    msg: 'O email deve ser válido.',
                },
                notEmpty: {
                    msg: 'O email não pode estar vazio.',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'A senha não pode estar vazia.',
                },
                len: {
                    args: [8, 100],
                    msg: 'A senha deve ter no mínimo 8 caracteres.',
                },
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                // Adicione lógica para hash de senha antes de salvar no banco
                const bcrypt = require('bcrypt');
                const saltRounds = 10;
                user.password = await bcrypt.hash(user.password, saltRounds);
            },
        },
        tableName: 'users', // Nome da tabela no banco de dados
    }
);

module.exports = User;