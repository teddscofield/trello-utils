define([
  'backbone',
  'scripts/features/home/home-controller',
  'scripts/view/primary-layout-view'
],

function(){

  var Backbone = require('backbone');
  var HomeController = require('scripts/features/home/home-controller');
  var PrimaryLayoutView = require('scripts/view/primary-layout-view');

  var Router = Backbone.Router.extend({

    initialize: function() { },

    routes: {
      '*path': 'default'
    },

    default: function(path) {
      var primaryLayoutView = new PrimaryLayoutView();
      var homeController = new HomeController({path: path});
      homeController.renderView();
    }
  });

  return Router;
});

