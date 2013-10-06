define([
  'require',
  'backbone'
],function(){
  'use strict';
  var Backbone = require('backbone');


  var BaseView = Backbone.View.extend({

    initialize: function(options) {
      var opts = options || {};
      this.model = opts.model || new Backbone.Model();
      var that = this;
      this.listenTo(this.model,'change',function(){
        that.render();
      });
    },

    render: function() {
      var viewMarkup = this.bindDataToTemplate();
      this.$el.html(viewMarkup);
    },

    bindDataToTemplate: function() {
      var viewData = this.model.toJSON();
      var viewMarkup = this.template( viewData );
      return viewMarkup;
    }
  });

  return BaseView;
});