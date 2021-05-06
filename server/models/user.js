'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      
    }
  };
  user.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 25]
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    logout_count: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    login_count: {
      type: DataTypes.INTEGER.UNSIGNED,
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};