var db = require('../../models');

var channelId = 1;

// get searchterms for channel conv to Array, & image_urls
db.searchterm.findAll({
  where:{channelId: channelId}
}).then(function(terms){
  var termArray = terms.map(function(term){
    return term.term;
  });
  var urlArray = terms.map(function(term){
    return term.image_url;
  });
  console.log('termArray',termArray);
  console.log('urlArray',urlArray);
});
