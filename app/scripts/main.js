define([
  'require',
  'backbone',
  'scripts/controllers/router'
],

function(){

  'use strict';
  var Backbone = require('backbone');

  window.domainModel = new Backbone.Model({name: 'hobbin'});
  var Router = require('scripts/controllers/router');
  var router = new Router();

  Backbone.history.start();
});