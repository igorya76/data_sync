var express = require('express');
var router = express.Router();
var download = require('../server/download');
var Download = require('../models/downloads')

router.get('/', async function(req, res){
  console.log('got it');
  var sync = await Download.returnMatchingRet()

  res.render('home/home', {data: sync})
})

router.get('/download', async function(req, res){
  console.log('downloading');
  download.downloadAPIData('user initated');
  res.redirect('/');
})
module.exports = router;
