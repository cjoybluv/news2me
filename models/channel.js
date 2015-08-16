'use strict';
module.exports = function(sequelize, DataTypes) {
  var channel = sequelize.define('channel', {
    name: DataTypes.STRING,
    search_terms: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return channel;
};