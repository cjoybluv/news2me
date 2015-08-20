'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('channels', 'search_terms');
    queryInterface.removeColumn('channels', 'termImageUrl');
    return true;
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.addColumn('channels', 'search_terms',Sequelize.TEXT);
    queryInterface.addColumn('channels', 'termImageUrl',Sequelize.TEXT);
    return true;
  }
};
