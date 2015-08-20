'use strict';
module.exports = function(sequelize, DataTypes) {
  var searchterm = sequelize.define('searchterm', {
    term: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.TEXT,
      defaultValue: 'https://pbs.twimg.com/profile_images/378800000700003994/53d967d27656bd5941e7e1fcddf47e0b_400x400.png'
    },
    channelId: DataTypes.INTEGER
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