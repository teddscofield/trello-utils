define([

  'scripts/view/base-view',
  'app',
  'lodash'

],function(){

  var _ = require('lodash'),
    app = require('app'),
    BaseView = require('scripts/view/base-view');

  var CardListBasic = BaseView.extend({

    initialize: function() {
      BaseView.prototype.initialize.call(this);

      this.$el = $('.trello-out');
      this.template = JST['app/templates/card-list-basic.html'];
      this.model.set({
        //name: 'default name'
      });
    },

    displayCards: function(){
      var cards = app.get('cards');
      this.model.set({cards: cards});
      console.log('displayCards finished');
    }


  });


  return CardListBasic;
});