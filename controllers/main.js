// var db = require('../models');
var express = require('express');
var router = express.Router();

// console.log('made it to router')

router.get("/", function(req, res) {
    // console.log('hey i got it!!!!')
    res.render('main/index');
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