'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('tweets', 'channelId', Sequelize.INTEGER);

  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('tweets', 'channelId');
  }
};
