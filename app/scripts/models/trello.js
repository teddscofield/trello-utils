define([
  'scripts/models/services/trello-service',
  'backbone',
  'jquery'
],function(){

  var $ = require('jquery');
  var TrelloService = require('scripts/models/services/trello-service');
  var Backbone = require('backbone');

  var TrelloModel = Backbone.Model.extend({
    defaults: {
      data: 'value'
    },

    initialize: function(){
      console.log(this);
      this.trelloService = new TrelloService();
    },

    auth: function() {
      var def = $.Deferred();
      var that = this;
      this.trelloService.oauthPopup()
        .done(function(){
          console.log('cool, oauth passed');
          def.resolve();
        })
        .fail(function(){
          console.log('eep oauth failed');
          def.reject();
        });
      return def;
    },

    fetchBoards: function() {
      this.trelloService.loadBoards();
    },

    fetchCards: function() {

      var def = $.Deferred();

      var that = this;
      $.Deferred().resolve()
        .then(function(){

          var boardDataLoaded =
            Object.keys(app.get('boards')).length > 0 ? true : false;

          if (boardDataLoaded) {
            console.log('Board data already loaded');
            return $.Deferred().resolve();
          }
          
          console.log('Loading board data');
          return that.trelloService.loadBoards();
        })
        .then(function(){
          console.log('Loading card data');
          return that.trelloService.loadCards();
        })
        .then(function(){
          console.log('Done loading all board and card data');
          def.resolve();
        });
      return def;
    }


  });

  return TrelloModel;
});