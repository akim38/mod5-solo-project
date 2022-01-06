'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'fakeuser1@gmail.com',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password123!'),
      },
      {
        email: 'toaster@gmail.com',
        username: 'Toaster',
        hashedPassword: bcrypt.hashSync('toaster1!'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op; 
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'Toaster'] }
    }, {});
  }
};
