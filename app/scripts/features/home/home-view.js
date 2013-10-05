define([
  'require',
  'jquery',
  'lodash',
  'backbone',
  'jquery-sortable',
  'JST'
],
function(){

  'use strict';
  var $ = require('jquery'),
    _ = require('lodash'),
    JST = require('JST'),
    Backbone = require('backbone');
  
  var HomeView = Backbone.View.extend({

    initialize: function(options){

      // Backbone.View object setup
      this.$el = $('.main-content');
      this.model = new Backbone.Model({name: 'default name'});
      this.events = {
        'click .trello-auth': 'authButtonClick',
        'click .trello-list-boards': 'listBoardsButtonClick',
        'click .trello-list-cards': 'listCardsButtonClick',
      };

      // bind render to changes in view data
      this.listenTo(this.model,'change',this.render);

      // custom
      this.controller = options.controller;
      this.template = JST['app/templates/trello-buttons.html'];
      $('.sortable').sortable();

    },

    render: function(){
      var viewData = this.model.toJSON();
      var viewMarkup = this.template( viewData );
      this.$el.html(viewMarkup);
    },

    authButtonClick: function() {
      this.controller.trelloAuth();
    },

    listBoardsButtonClick: function() {
      this.controller.listBoards();
    },

    listCardsButtonClick: function() {
      this.controller.listCards();
    }

  });

  return HomeView;
});