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
      this.trelloService.auth()
        .done(function(){
          console.log('cool, auth passed');
          def.resolve('RESOLVE TrelloModel.auth success');
        })
        .fail(function(){
          console.log('eep auth failed');
          def.reject('RESOLVE TrelloModel.auth failed');
        });
      return def;
    },

    fetchBoards: function() {
      this.trelloService.loadBoards();
    },

    fetchCards: function() {

      var def = $.Deferred();
      var that = this;


      // begin deferred execution chain to load first
      // board data then card data.
      $.Deferred().resolve('RESOLVE begine load board, card data')

      // check that board data has been loaded.
      // load from trello if need be.
      .then(function(){
        console.log(['start load board data',arguments]);
        var boardDataLoaded =
          Object.keys(app.get('boards')).length > 0 ? true : false;

        if (boardDataLoaded) {
          return $.Deferred().resolve('RESOLVE board data already loaded');
        }
        
        console.log('Loading board data');
        return that.trelloService.loadBoards();
      })

      // load card data from trello
      // TODO: add check to see if data is already loaded
      .then(function(){
        console.log(['start load card data',arguments]);
        return that.trelloService.loadCards();
      },function(){
        console.log(['failed to load board data',arguments]);
        return def.reject('REJECT failed to load board data');
      })

      // signal to caller that data load is complete by
      // resolving the deferred object returned by this method
      .then(function(){
        def.resolve();
      },function(){
        console.log('ahhh F it, I give up');
      });

      return def;
    }


  });

  return TrelloModel;
});