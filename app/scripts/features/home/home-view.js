define([
  'require',
  'jquery',
  'lodash',
  'backbone',
  'jquery-sortable',
  'JST',
  'scripts/view/base-view'
],
function(){

  'use strict';
  var $ = require('jquery'),
    _ = require('lodash'),
    JST = require('JST'),
    Backbone = require('backbone'),
    BaseView = require('scripts/view/base-view');

  var HomeView = BaseView.extend({

    initialize: function(options){
      BaseView.prototype.initialize.call(this,options);

      this.$el = $('.main-content');
      this.template = JST['app/templates/trello-buttons.html'];
      this.model.set({
        //name: 'default name'
      });

      this.events = {
        'click .trello-auth': 'authButtonClick',
        'click .trello-list-boards': 'listBoardsButtonClick',
        'click .trello-list-cards': 'listCardsButtonClick',
      };

      this.controller = options.controller;
      $('.sortable').sortable();

    },

    authButtonClick: function() {
      this.controller.trelloAuth();
    },

    listBoardsButtonClick: function() {
      this.controller.listBoards();
    },

    listCardsButtonClick: function() {
      console.log('list cards click');
      this.controller.listCards();
    }

  });

  return HomeView;
});