'use strict';
module.exports = function(sequelize, DataTypes) {
  var searchterm = sequelize.define('searchterm', {
    term: DataTypes.STRING,
    image_url: DataTypes.TEXT,
    channelId: DataTypes.INTEGER,
    order_val: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.searchterm.belongsTo(models.channel),
        models.searchterm.hasMany(models.tweet)
      }
    }
  });
  return searchterm;
};