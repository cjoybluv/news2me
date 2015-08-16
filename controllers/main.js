// var db = require('../models');
var express = require('express');
var router = express.Router();

console.log('made it to router')

router.get("/", function(req, res) {
    console.log('hey i got it!!!!')
    res.render('main/index');
});




module.exports = router;