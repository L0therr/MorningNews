var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//models
var connect = require('../models/connect');
var usersModel = require('../models/users')

router.post('/signup', async function(req, res, next) {
  var name = req.body.username;
  var mail = req.body.email;
  var pswd = req.body.pswd;

  var alreadyUseMail = await usersModel.find({
    email: mail,
  });

  //register the user
  if (!alreadyUseMail[0]) {
    var newUser = new usersModel({
      username: name,
      email: mail,
      password: pswd,
    })
    await newUser.save();
    res.json({result: true});
  } else {
    res.json({result: false, error: 'email already used'});
  }
});

module.exports = router;
