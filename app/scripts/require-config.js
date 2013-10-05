requirejs.config({
    baseUrl: '..',
    paths: {
      jquery: 'vendor/jquery',
      require: 'vendor/require',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      'jquery-sortable': 'vendor/jquery.sortable',
      'trello-client': 'vendor/trello-client',
      app: 'scripts/models/app',
      handlebars: 'vendor/handlebars.runtime',
    },
    map: {
      '*': {
        'underscore': 'lodash'
      }
    },
    shim: {
      'backbone': {
        'deps': ['underscore', 'jquery', 'handlebars'],
        'exports': 'Backbone'
      },
      'jquery-sortable': {
        'deps': ['jquery']
      },
      'trello-client': {
        'exports': 'Trello',
        'deps': ['jquery']
      },
      'handlebars': {
        'exports': 'Handlebars'
      },
    }
  });

  // Bootstrap the application
  require(['scripts/main'], function(main) {
    console.log('require main');
  });