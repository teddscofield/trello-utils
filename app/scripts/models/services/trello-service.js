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

    auth: function(doInteractiveOauth,defSupplied) {
      var def = defSupplied || $.Deferred();
      var that = this;
      var interactiveOauth = doInteractiveOauth || false;
      var errHandler = (doInteractiveOauth) ?
        this.authInteractiveFatal : this.authStoredTokenError;

      Trello.authorize({
        name: app.get('appName'),
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
      app.set({ trelloAuthed: true });
      def.resolve('RESOLVE auth success');
    },

    authStoredTokenError: function(def) {
      console.log('auth fail using stored token, attempting interactive auth');

      //this.auth(true, def);
      def.reject('REJECT token based auth failed');
      return false;
    },

    authInteractiveFatal: function(def) {
      console.log('giving up auth attempts after trying token based and interactive authorizations');
      def.reject('REJECT interactive auth error');
    },

    // load board for an organization
    loadBoards: function() {

      var def = $.Deferred();
      var that = this;

      if ( ! app.get('boards') ) {
        app.set('boards',{});
      }

      if ( ! app.get('boardNames') ) {
        app.set('boardNames',{});
      }

      console.log(['TrelloService.loadBoards','#0 load cards starting',arguments]);
      $.Deferred().resolve('RESOLVE begin load boards deferred chain')
      .then(function(){
        console.log(['TrelloService.loadBoards','#1 start auth',arguments]);
        return that.auth();
      })
      .then(function(){
        console.log(['TrelloService.loadBoards','#2 start getting board data',arguments]);

        var count = 0;
        var org = app.get('targetOrganization');
        var res = 'organizations/'+org+'/boards';
        Trello.get(res,function(boardsArray){

          count++;
          _.each(boardsArray,function(object,idx,array){
            count--;
            app.get('boards')[object.id] = object;
            app.get('boardNames')[object.name] = object.id;
            if (count === 0) {
              def.resolve('RESOLVE TrelloService.loadBoards finished loading board data');
            }
          });

        });

      },function(){
        console.log(['TrelloService.loadBoards','#2f auth step failed',arguments]);
        def.reject('REJECT auth when loading board data erroed');
      })
      .fail(function(){
        console.log(['TrelloService.loadBoards','FAIL load boards failed',arguments]);
        def.reject('REJECT fail during load boards deferred chain');
      });

      return def;
    },


    // load cards for each of the boards that has been
    // loaded into the app thus far.
    loadCards: function() {

      var def = $.Deferred();
      var that = this;

      // initialize app cards and cardNames objects
      if ( ! app.get('cards') ) {
        app.set('cards',{});
      }
      if ( ! app.get('cardNames') ) {
        app.set('cardNames',{});
      }

      console.log(['TrelloService.loadCards','#0 load cards starting']);
      $.Deferred().resolve('RESOLVE begin load cards deferred chain')
      .then(function(){
        console.log(['TrelloService.loadCards','#1 start auth',arguments]);
        return that.auth();
      })
      .then(function(){

        console.log(['TrelloService.loadCards','#2 load cards for each board']);
        
        // iterate over each board.  need to keep count
        // since lodash each() is async in order to tell
        // when we are done.
        var boards = app.get('boards');
        var count = 0;
        _.each(boards,function(object,index,array){

          // fetch card data for this board
          var res = 'boards/'+object.id+'/cards';
          count++;
          Trello.get(res,function(cardsArray){
            count--;
            // assing card data to collection of cards
            _.each(cardsArray,function(object,index,array) {
              app.get('cards')[object.id] = object;
              app.get('cardNames')[object.name] = object.id;
            });

            // we're finished when the counter hits 0
            if (count === 0) {
              def.resolve();
            }
          });

        });

      });

      return def;
    }


  },TrelloConfig);

  return TrelloService;
});