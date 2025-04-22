const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration_in_hours: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    validity_in_years: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Course;