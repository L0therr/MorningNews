var express = require('express');
var router = express.Router();
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var uid2 = require("uid2");
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
    var salt = uid2(32);
    var newUser = new usersModel({
      username: name,
      email: mail,
      sel: salt,
      password: SHA256(pswd + salt).toString(encBase64),
      token: uid2(32),
    })
    await newUser.save();
    res.json({result: true, currentUser: {name: newUser.username, mail: newUser.email, token: newUser.token}, error: 'Sign-Up succeded !'});
  } else {
    res.json({result: false, error: 'email already used'});
  }
});

//login
router.post('/login', async function(req, res, next) {
  var mail = req.body.email;
  var pswd = req.body.pswd;

  var user = await usersModel.findOne({ email: mail }).exec(function (err, user) {

    var hash =SHA256(pswd + user.sel).toString(encBase64);
    
    if (user.password === hash) {
      res.json({result: true, currentUser: {name: user.username, mail: user.email, token: user.token} , error: 'Login succeded !'});
    } else {
      res.json({result: false, error: 'Email or password is wrong'});
    }
  });
});

module.exports = router;
