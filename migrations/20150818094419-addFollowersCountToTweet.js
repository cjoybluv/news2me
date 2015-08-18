'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.addColumn('tweets', 'follower_count', Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
     queryInterface.removeColumn('tweets', 'follower_count');
  }
};
