'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exam.init({
    name: DataTypes.STRING,
    subject: DataTypes.STRING,
    time: DataTypes.INTEGER,
    numberOfQuestion: DataTypes.INTEGER,
    impClass: DataTypes.STRING,
     status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Exam',
  });
  return Exam;
};