define([
  'backbone',
  'scripts/features/home/home-controller'
],

function(){

  var Backbone = require('backbone');
  var HomeController = require('scripts/features/home/home-controller');

  var Router = Backbone.Router.extend({

    initialize: function(){
      console.log('Router init');
    },

    routes: {
      '*path': 'default'
    },

    default: function(path) {
      console.log(['default route!',path]);
      var homeController = new HomeController({path: path});
      homeController.renderView();

    }
  });

  return Router;
});

