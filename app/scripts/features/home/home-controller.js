define([
  'require',
  'lodash',
  'backbone',
  'jquery',
  'scripts/features/home/home-view',
  'scripts/models/services/trello-service',
  'scripts/models/trello',
  'scripts/view/card-list-basic-view'
],
function(){

  'use strict';

  var _ = require('lodash');
  var $ = require('jquery');
  var Backbone = require('backbone');
  var HomeView = require('scripts/features/home/home-view');
  var TrelloService = require('scripts/models/services/trello-service');
  var TrelloModel = require('scripts/models/trello');
  var CardListBasicView = require('scripts/view/card-list-basic-view');

  var HomeController = function(){
    this.initialize(arguments);
  };

  HomeController.prototype = _.extend({
    initialize: function(options) {

      this.view = new HomeView({controller: this});
      this.trelloModel = new TrelloModel();
      this.domainModel = window.domainModel;
      this.listenTo(this.domainModel,'change',this.notifyView);
    },

    renderView: function(){
      this.view.render();
    },

    notifyView: function() {
      // push mediated values into the view
      // cheapest way to accomplish mediating data, pass through
      // like this.  but when needed, this is the spot to customize
      // data sent to the view object.
      this.view.model.set(this.domainModel.attributes);
    },

    trelloAuth: function() {
      this.trelloModel.auth();
    },

    listBoards: function() {

      this.trelloModel.fetchBoards();
    },

    listCards: function() {
      console.log('list called called');
      var cardListBasicView = new CardListBasicView();

      var that = this;
      $.Deferred().resolve()
      .then(function(){
        console.log('fetching cards');
        return that.trelloModel.fetchCards();
      })
      .then(function(){
        console.log('displaing cards');
        cardListBasicView.displayCards();
      });

      cardListBasicView.render();
      $('.sortable').sortable();
    }



  },Backbone.Events);

  return HomeController;
});