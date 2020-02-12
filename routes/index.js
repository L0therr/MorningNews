var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//models
var connect = require('../models/connect');
var usersModel = require('../models/users')

// get session
router.get('/get-session', async function(req, res, next) {
  console.log('get session: ' + req.session)
  var sess = req.session;
  res.json(sess)
})

//signup
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
    req.session.currentUser = {
      name: name,
      mail: mail,
    }
    res.json({result: true, currentUser: req.session.currentUser, error: 'Sign-Up succeded !'});
  } else {
    res.json({result: false, error: 'email already used'});
  }
});

//login
router.post('/login', async function(req, res, next) {
  var mail = req.body.email;
  var pswd = req.body.pswd;

  var alreadyUseMail = await usersModel.find({
    email: mail,
    password: pswd
  });

  if (alreadyUseMail[0]) {
    req.session.currentUser = {
      name: alreadyUseMail.username,
      mail: alreadyUseMail.email,
    }
    res.json({result: true, currentUser: req.session.currentUser, error: 'Login succeded !'});
  } else {
    res.json({result: false, error: 'Email or password is wrong'});
  }


});

module.exports = router;
