var express = require('express');
var app = express();
var config = require('../config/config');
var cheerio = require('cheerio');
var url = 'https://house.jumia.ci/rent/';




//  request to save in algolia
app.get('/',function(req,res){
    var objects = [{
    firstname: 'test',
    lastname: 'again'
  }, {
    firstname: 'why',
    lastname: 'not'
  }];

  index.addObjects(objects, function(err, content) {
    console.log(content);
    res.send(content);
  });

});












module.exports = app;
