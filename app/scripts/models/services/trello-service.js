define([
  'require',
  'lodash',
  'trello-client',
  'jquery',
  'app'
],
function(){

  var _ = require('lodash');
  var Trello = require('trello-client');
  var $ = require('jquery');
  var app = require('app');

  var TrelloConfig = {
    TRELLO_KEY: '4704d4eac5a5ad6208682bf53c48d4bf'
  };

  var TrelloService = function(){ };

  TrelloService.prototype = _.extend({

    oauthPopup: function(doInteractiveOauth,defSupplied) {
      var def = defSupplied || $.Deferred();
      var that = this;
      var interactiveOauth = doInteractiveOauth || false;
      var errHandler = (doInteractiveOauth) ?
        this.authInteractiveFatal : this.authStoredTokenError;

      Trello.authorize({
        name: app.appName,
        type: 'popup',
        success: function(){
          that.onAuthSuccess(def);
        },
        error: function(){
          errHandler.call(that,def);
        },
        persist: false,
        expiration: 'never',
        interactive: interactiveOauth,
        scope: {
          read: true,
          write: true
        }
      });
      return def;
    },

    onAuthSuccess: function(def) {
      console.log('trello service: onSuccess');
      app.trelloAuthed = true;
      def.resolve();
    },

    authStoredTokenError: function(def) {
      console.log('oauth fail using stored token, attempting interactive oauth');

      this.oauthPopup(true, def);
      return false;
    },

    authInteractiveFatal: function(def) {
      console.log('giving up oauth attempts');
      def.reject();
    },

    loadBoards: function() {

      var def = $.Deferred();
      var org = app.targetOrganization;
      app.boards = {};
      app.boardNames = {};
      var res = 'organizations/'+org+'/boards';
      var that = this;

      $.Deferred().resolve()
        .then(function(){
          return that.oauthPopup();
        })
        .then(function(){

          Trello.get(res,function(boardsArray){
            _.each(boardsArray,function(object,idx,array){
              app.boards[object.id] = object;
              app.boardNames[object.name] = object.id;
            });

            console.log('Board Names');
            _.each(app.boardNames,function(v,i){
              console.log('  '+i+' '+v);
            });

            def.resolve();
          });

        })
        .fail(function(){
          def.reject();
        });

      return def;
    },

    loadCards: function() {

      var def = $.Deferred();
      var org = app.targetOrganization;
      app.cards = {};
      app.cardNames = {};
      var boards = app.boards;
      var that = this;
      $.Deferred().resolve()
        .then(function(){
          return that.oauthPopup();
        })
        .then(function(){

          _.each(boards,function(object,index,array){
            var res = 'boards/'+object.id+'/cards';
            Trello.get(res,function(cardsArray){
              console.log('Cards for ['+object.name+']');
              console.log(cardsArray);

              _.each(cardsArray,function(object,index,array) {
                app.cards[object.id] = object;
                app.cardNames[object.name] = object.id;
              });

              console.log([app.cardNames]);
              def.resolve();
            });
          });

        });

      return def;
    }


  },TrelloConfig);

  return TrelloService;
});