'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.addColumn('channels', 'termImageUrl', Sequelize.TEXT);
 },

  down: function (queryInterface, Sequelize) {
     queryInterface.removeColumn('channels', 'termImageUrl');
  }
};
