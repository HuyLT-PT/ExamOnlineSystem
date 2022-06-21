'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentAnswer.init({
    studentId: DataTypes.INTEGER,
    examId: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    sbd: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    studentAnswer: DataTypes.STRING,
    result: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'StudentAnswer',
  });
  return StudentAnswer;
};