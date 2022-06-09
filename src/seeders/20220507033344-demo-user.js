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
      email:'student2@gmail.com',
      password : '123456',
      firstName: 'MONKEY D',
      lastName: 'DARAGON',
      class : '12A2',
      dateOfBirth: '05-10-99',
      phoneNumber :'0988348216',
      address: 'HN-VN',
      gender: 0,
      roleid: '2',
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
