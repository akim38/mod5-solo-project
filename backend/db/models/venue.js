'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    location: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    region: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
  }, {});
  Venue.associate = function(models) {
    // associations can be defined here
    Venue.hasMany(models.Event, { foreignKey: 'venueId'})
  };
  return Venue;
};
