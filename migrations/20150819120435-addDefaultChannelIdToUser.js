'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn('users', 'defaultChannelId', Sequelize.INTEGER);
      return true;
},

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'defaultChannelId');
    return true;
  }
};
