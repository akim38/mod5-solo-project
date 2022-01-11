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
        email: 'profoak@gmail.com',
        username: 'ProfOak',
        hashedPassword: bcrypt.hashSync('pokemon123'),
      },
      {
        email: 'joey@gmail.com',
        username: 'joeysrattata',
        hashedPassword: bcrypt.hashSync('rattata1!'),
      },
      {
        email: 'safarizone@gmail.com',
        username: 'wardenbao',
        hashedPassword: bcrypt.hashSync('safari'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'ProfOak', 'joeysrattata', 'wardenbao'] }
    }, {});
  }
};
