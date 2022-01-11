'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(600)
    },
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
    Group.hasMany(models.Event, { foreignKey: 'groupId'});

    const columnMapping = {
      through: 'UserGroup',
      otherKey: 'userId',
      foreignKey: 'groupId'
    }

    Group.belongsToMany(models.User, columnMapping); 

  };
  return Group;
};
