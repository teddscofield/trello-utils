define([
  'require',
  'lodash',
  'backbone'
],function(){
  'use strict';

  var _ = require('lodash');
  var Backbone = require('backbone');
  var App = Backbone.Model.extend({
    defaults: {
      appName: 'Trello Utils',
      targetOrganization: 'programtemplate',
      boards: {}
    }
  });

  // expose app object to window.  primarily for debug purposes
  window.app = new App();

  return window.app;
});