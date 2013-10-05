define([
  'require',
  'lodash'
],function(){
  'use strict';

  var _ = require('lodash');

  var app = {
    appName: 'Trello Tools',
    targetOrganization: 'programtemplate',
    boards: {},
  };

  // expose app object to window.  primarily for debug purposes
  window.app = app;

  return app;
});