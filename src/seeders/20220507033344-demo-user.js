'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
     /* email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      dateOfBirth : DataTypes.STRING,
      phoneNumber :DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      roleid: DataTypes.STRING */ 
      email:'admin@gmail.com',
      password : '123456',
      firstName: 'CaMap',
      lastName: ' SauRang',
      dateOfBirth: '05-10-99',
      phoneNumber :'0988348216',
      address: 'VN',
      gender: 1,
      roleid: 'AD',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
