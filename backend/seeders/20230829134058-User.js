'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: '123',
        school: 'ncu',
        city: 'Taipei',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageContent: '01.png',
        loginTime: new Date(),
        state: 0
      },
      {
        name: 'Jon Doe',
        email: 'jondoe@example.com',
        password: '123',
        school: 'ncu',
        city: 'Taipei',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageContent: '01.png',
        loginTime: new Date(),
        state: 0
      },
    ],
    {},
  ),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
