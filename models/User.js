'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define associations here
            User.hasMany(models.Article, {
                foreignKey: 'user_id',
                as: 'articles',
            });
            User.hasMany(models.Comment, {
                foreignKey: 'user_id',
                as: 'comments',
            });
        }
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        profilePicture:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'User',
        timestamps: false,
        tableName:'users',
    });
    return User;
};
