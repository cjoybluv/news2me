var db = require('../models');


// // USE THIS ROUTINE TO CALL HOME VIEW
//   db.channel.find({
//     where:{
//       name: 'presidentElect2016'
//     }
//   }).then(function(channel){
//     var result = channel.get().search_terms.split('///');
//     console.log('Straight Array',result);
//     // // do something with this result HERE!!! like...
//     // res.render('main/index', {
//     //   search_terms: result
//     // });
//   });
// // **********************************



// USE THIS ROUTINE TO CALL HOME VIEW
  db.channel.find({
    where:{
      name: 'presidentElect2016'
    }
  }).then(function(channel){
    var result = channel.get().search_terms.split('///').map(function(term){
      return '@'+term.replace(/ /gi, '').toLowerCase()});


    console.log('@array',result);
    // // do something with this result HERE!!! like...
    // res.render('main/index', {
    //   search_terms: result
    // });
  });
// **********************************


