define([
  'require',
  'jquery',
  'backbone',
  'app',
  'JST',
  'scripts/view/base-view'
],function(){
  'use strict';

  var $ = require('jquery');
  var JST = require('JST');
  var app = require('app');
  var Backbone = require('backbone');
  var BaseView = require('scripts/view/base-view');

  var PrimaryLayoutView = BaseView.extend({
    
    initialize: function(options) {
      BaseView.prototype.initialize.call(this,options);

      this.$el = $('body');
      this.template = JST['app/templates/primary-layout.html'];
      this.model.set({
        appName: app.get('appName')+' App'
      });
    }
    
  });

  return PrimaryLayoutView;
});