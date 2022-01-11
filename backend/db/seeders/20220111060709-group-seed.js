'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Groups', [
     {
       name: 'Pokemon Trainers',
       description: `For those that battle and train their Pokemon to become the best!`,
       imageUrl: null,
       createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Fans of Rattata',
      description: `For trainers who just love Rattata and can't get enough!`,
      imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png',
      createdAt: new Date(),
      updatedAt: new Date()
     },
   ], {});

  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Groups', null, {});

  }
};
