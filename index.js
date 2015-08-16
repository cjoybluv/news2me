var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');

var usersController = require("./controllers/users")
var mainController = require("./controllers/main")

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(session({
//   secret: 'some secret key',
//   resave: false,
//   saveUninitialized: true
// }));
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);
// app.use(methodOverride('_method'));

app.use("/users", usersController);
app.use("/", mainController);




app.listen(3000);