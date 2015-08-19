var db = require('../models');
var express = require('express');
var router = express.Router();

// console.log('made it to router')

router.get("/", function(req, res) {
    // console.log('hey i got it!!!!')
  var defaultChannel = 'presidentElect2016';
  // var defaultChannel = 'earthChanges';
  db.channel.find({
    where:{
      name: defaultChannel
    },
    include:[db.searchterm]
  }).then(function(thisChannel){

    thisChannel.getSearchterms().then(function(searchTerms) {
      // console.log(searchTerms.length);
      // res.send(terms);
      res.render('main/indexDH', {
        channel: thisChannel,
        search_terms: searchTerms
      });
    });
  });
});

//GET /restricted
//an example restricted page
router.get('/restricted',function(req,res){
  if(req.currentUser){
    res.render('main/restricted');
  } else {
    res.redirect('/');
  }
});



module.exports = router;