var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//models
var connect = require('../models/connect');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({test: 'ok'});
});

router.post('/signup', async function(req, res, next) {
  console.log(req.body);
  res.json(req.body)
});

module.exports = router;
