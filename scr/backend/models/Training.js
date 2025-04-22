const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Training = sequelize.define('Training', {
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    completion_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Training;