'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('searchterms', 'order_val');
    return true;
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.addColumn('searchterms', 'order_val',Sequelize.INTEGER);
    return true;
  }
};
