var db = require('../../models');

var channelId = 4;

// create 1st search_term
db.channel.findById(channelId).then(function(channel){
  var terms = channel.get().search_terms.split('///');
  var termImages = channel.get().termImageUrl.split('///');

  terms.forEach(function(term,idx) {
    db.searchterm.create({
      term: term,
      image_url: termImages[idx],
      channelId: channelId,
      order_val: idx
    }).then(function(data){
      console.log('term created',data);
    });
  });

  db.channel.findById(channelId).then(function(channel){
    channel.getSearchterms().then(function(terms){
      console.log(terms.length.toString() + ' search terms created');
    });
  });
});

