'use strict';
module.exports = function(sequelize, DataTypes) {
  var channel = sequelize.define('channel', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.channel.belongsTo(models.user),
        models.channel.hasMany(models.tweet),
        models.channel.hasMany(models.searchterm)
     }
    }
  });
  return channel;
};