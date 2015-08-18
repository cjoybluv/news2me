var sentiment = require('sentiment');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var tweet = sequelize.define('tweet', {
    tweet_id: DataTypes.STRING,
    tweet_created_at: DataTypes.DATE,
    tweet_text: DataTypes.STRING,
    tweet_source: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_url: DataTypes.STRING,
    retweet_count: DataTypes.INTEGER,
    favorite_count: DataTypes.INTEGER,
    sentiment_score: DataTypes.INTEGER,
    sentiment_comparative: DataTypes.FLOAT,
    sentiment_positive: DataTypes.STRING,
    sentiment_negative: DataTypes.STRING,
    search_term: DataTypes.STRING,
    channelId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.tweet.belongsTo(models.channel);
      }
    }
  });
  return tweet;
};