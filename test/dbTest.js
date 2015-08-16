var db = require('../models');



// db.user.create({ email: 'cjoybluv@gmail.com', password: 'wafflesNow', name: 'Dave' })
//   .then(function(data) {
//       console.log('<<<  USER CREATED >>>');
//   });


db.channel.create({ name: 'presidentElect2016', search_terms: 'Hillary Clinton///Bernie Sanders///Donald Trump///Chris Christie' })
  .then(function(data) {
      console.log('<<<  CHANNEL CREATED >>>');
  });

 // db.user.findOrCreate({where: {name: "Dave"}}).spread(function(user, created) {
//   user.createPost({email: "cjoybluv@gmail.com", password: "pargolf72", name: "Dave"}).then(function(uer) {
//     console.log(post.get());
//   })
// });
