'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('tweets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tweet_id: {
        type: Sequelize.INTEGER
      },
      tweet_created_at: {
        type: Sequelize.DATE
      },
      tweet_text: {
        type: Sequelize.STRING
      },
      tweet_source: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      user_url: {
        type: Sequelize.STRING
      },
      retweet_count: {
        type: Sequelize.INTEGER
      },
      favorite_count: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('tweets');
  }
};