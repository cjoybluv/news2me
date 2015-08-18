'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('tweets', 'sentiment_score', Sequelize.INTEGER);
    queryInterface.addColumn('tweets', 'sentiment_comparative', Sequelize.FLOAT);
    queryInterface.addColumn('tweets', 'sentiment_positive', Sequelize.STRING);
    queryInterface.addColumn('tweets', 'sentiment_negative', Sequelize.STRING);

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('tweets', 'sentiment_score');
    queryInterface.removeColumn('tweets', 'sentiment_comparative');
    queryInterface.removeColumn('tweets', 'sentiment_positive');
    queryInterface.removeColumn('tweets', 'sentiment_negative');

  }
};
