'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Events', [
     {
       userId: 2,
       groupId: 1,
       name: `Starter Pokemon Giveaway`,
       date: new Date(),
       description: `Giving away starter Pokemon to those who are starting their Pokemon journey. First come first serve! Limited amount only so get here early before we are out!`,
       location: `Professor Oak's Lab`,
       city: `Pallet Town`,
       region: `Kanto`,
       imageUrl: `https://bestreamer.com/wp-content/uploads/2019/12/01-Bulbasaur-Charmander-Squirtle.jpg`,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      userId: 3,
      groupId: 2,
      name: `Rattata Meetup`,
      date: new Date(),
      description: `Come bring out your Rattata to meet up with other Rattatas! Talk with other Rattata trainers about their favorite berries! Even if you don't own one, come to see all the awesome Rattata!`,
      location: `Route 30`,
      city: null,
      region: `Johto`,
      imageUrl: null,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      userId: 4,
      groupId: 1,
      name: `Come Catch All You Can At the Safari Zone`,
      date: new Date(),
      description: `The Safari Zone will be reopening after construction! Come and catch all the rare Pokemon you can! Please note there is an entrance fee.`,
      location: `Safari Zone`,
      city: `Fuchsia City`,
      region: `Kanto`,
      imageUrl: null,
      createdAt: new Date(),
      updatedAt: new Date()
     }
   ])
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Events', null, {});
  }
};
