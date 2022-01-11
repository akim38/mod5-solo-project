'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Venues' }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Groups' }
    },
    name: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING(600)
    },
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, { foreignKey: 'userId'});
    Event.belongsTo(models.Venue, { foreignKey: 'venueId'});
    Event.belongsTo(models.Group, { foreignKey: 'groupId'});

  };
  return Event;
};
