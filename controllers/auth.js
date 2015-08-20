var db = require('../models');
var express = require('express');
var router = express.Router();

//GET /auth/login
//display login form
router.get('/login',function(req,res){
    res.render('auth/login');
});

//POST /login
//process login data and login user
router.post('/login',function(req,res){
  db.user.authenticate(req.body.email,req.body.password,
    function(err,user){
      if(err){
        res.send(err);
      } else if(user) {
        req.session.user = user.id;
        req.flash('info','You are logged in');
        req.session.currentChannel = user.defaultChannelId;
        res.redirect('/');
      } else {
        req.flash('danger','invalid username or email');
        res.redirect('/auth/login');
      }
    }
  );
});

//GET /auth/signup
//display sign up form
router.get('/signup',function(req,res){
    res.render('auth/signup');
});

//POST /auth/signup
//create new user in database
router.post('/signup',function(req,res){
  if (req.body.password != req.body.password2) {
    req.flash('danger','passwords not matching');
    res.redirect('/auth/signup');
  } else {
    db.user.findOrCreate({
      where: {email: req.body.email},
      defaults: {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        defaultChannelId: 1
       }
    }).spread(function(user, created) {
      if(created) {
        req.flash('success','You are signed up');
        req.session.user = user.id;
        req.flash('info','You are logged in');
        req.session.currentChannel = user.defaultChannelId;
        res.redirect('/');
      } else {
        req.flash('danger','A user with that email already exists.');
        res.redirect('/auth/login');
      }
    }).catch(function(err){
      if (err.message){
        req.flash('danger',err.message);
      } else {
        req.flash('danger','unknown error');
        res.send(err);
        res.redirect('/auth/signup');
      }
    });
  }
});

//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){
  req.flash('info','You have been logged out.');
  req.session.currentChannel = 1;
  req.session.user = false;
  res.redirect('/');
});


module.exports = router;