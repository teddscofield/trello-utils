define([
  'require',
  'lodash'
],function(){
  'use strict';

  var _ = require('lodash');

  var app = {
    appName: 'Trello Utils',
    targetOrganization: 'programtemplate',
    boards: {},
    get: function(key) {
      return this[key];
    }
  };

  // expose app object to window.  primarily for debug purposes
  window.app = app;

  return app;
});