'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.addColumn('tweets', 'searchtermId', Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
     queryInterface.removeColumn('tweets', 'searchtermId');
  }
};
