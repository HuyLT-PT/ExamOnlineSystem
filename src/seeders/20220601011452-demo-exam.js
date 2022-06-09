'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('Exams', [{ 
      name:'FinalExam',
      subject : 'English',
      time: 60,
      numberOfQuestion: 50,
       impClass: '12A2',
       status: 'DONE ', //  DONE && NONE
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
    return queryInterface.bulkDelete('Exams', null, {});
  }
};
