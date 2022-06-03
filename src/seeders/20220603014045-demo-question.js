'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('Questions', [{ 
      examId:'1',
      content : '1+1',
      optionA: '1',
      optionB: '2',
      optionC: '3',
      optionD: '4',
      key: 'A',
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
      return queryInterface.bulkDelete('Questions', null, {});
  }
};
