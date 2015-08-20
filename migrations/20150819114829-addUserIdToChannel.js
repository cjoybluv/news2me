'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn('channels', 'userId', Sequelize.INTEGER);
      return true;
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.removeColumn('channels', 'userId');
      return true;
  }
};
