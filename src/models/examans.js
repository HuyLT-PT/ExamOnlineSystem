'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExamAns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExamAns.init({
    examId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    ansList: DataTypes.JSON,
    img : DataTypes.BLOB,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ExamAns',
  });
  return ExamAns;
};