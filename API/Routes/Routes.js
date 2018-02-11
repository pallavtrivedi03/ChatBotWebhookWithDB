'use strict';
var express = require('express');

module.exports = function(app) {
  var gameDataController = require('../Controllers/GameDataController');

  var apiRoutes =  express.Router();

  app.get('/',function(req,res){
    res.send('We are happy to see you using Chat Bot Webhook');
  });

  // registerUser Route
  app.route('/get-team-stats')
    .post(gameDataController.getTeamStats);

};
