'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassIn4 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClassIn4.init({
    name: DataTypes.STRING,
    teacher: DataTypes.STRING,
    teacherId: DataTypes.INTEGER,

    numberOfStudent: DataTypes.STRING,
    examImp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ClassIn4',
  });
  return ClassIn4;
};