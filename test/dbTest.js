var db = require('../models');



// db.user.create({ email: 'cjoybluv@gmail.com', password: 'wafflesNow', name: 'Dave' })
//   .then(function(data) {
//       console.log('<<<  USER CREATED >>>');
//   });

var searchTerms = [
  "Jeb Bush",
  "Ben Carson",
  "Chris Christie",
  "Ted Cruz",
  "Carly Fiorina",
  "Jim Gilmore",
  "Lindsey Graham",
  "Mike Huckabee",
  "Bobby Jindal",
  "John Kasich",
  "Rand Paul",
  "George Pataki",
  "Rick Perry",
  "Marco Rubio",
  "Rick Santorum",
  "Donald Trump",
  "Scott Walker",
  "Hillary Clinton",
  "Martin O'Malley",
  "Bernie Sanders",
  "Lincoln Chafee",
  "Jim Webb"
];

var strTerms = searchTerms.toString().replace(/,/gi,'///');

// console.log('str_terms',strTerms);
db.channel.findById(1).then(function(channel) {
  channel.search_terms = strTerms;
  channel.save();
});

// db.channel.create({ name: 'presidentElect2016', search_terms: search_terms })
//   .then(function(data) {
//       console.log('<<<  CHANNEL CREATED >>>');
//   });

 // db.user.findOrCreate({where: {name: "Dave"}}).spread(function(user, created) {
//   user.createPost({email: "cjoybluv@gmail.com", password: "pargolf72", name: "Dave"}).then(function(uer) {
//     console.log(post.get());
//   })
// });
