'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    location: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING
  }, {});
  Venue.associate = function(models) {
    // associations can be defined here
  };
  return Venue;
};