const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserData extends Model {}

UserData.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        address_line_1: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        address_line_2: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        state: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        zip_code: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        github_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        linkedin_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_data',
    }
);

module.exports = UserData;