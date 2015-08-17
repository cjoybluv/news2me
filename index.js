var db = require('./models');
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var session = require('express-session');
var flash = require('connect-flash');
var authController = require("./controllers/auth");
var mainController = require("./controllers/main");
var twitterController = require("./controllers/twitter");
var d3testController = require("./controllers/d3test");
var testController = require("./controllers/test");

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


// session user stuff
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(function(req,res,next){
  // req.session.user=1;  // hard code user for development
  if(req.session.user) {
    db.user.findById(req.session.user).then(function(user){
      req.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    next();
  }
});

app.use(function(req,res,next){
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
});
// end session stuff

app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);
// app.use(methodOverride('_method'));

app.use("/auth", authController);
app.use("/", mainController);
app.use("/twitter", twitterController);
app.use("/d3", d3testController);
app.use("/test", testController);




app.listen(3000);