define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["app/templates/list-test.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "  <div id=\"sort-test\">\r\n    <ul class=\"sortable\">\r\n    <li>Item 1\r\n    <li>Item 2\r\n    <li>Item 3\r\n    <li>Item 4\r\n    </ul>\r\n  </div>";
  });

this["JST"]["app/templates/trello-buttons.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"trello-buttons\">\r\n  <div class=\"trello-auth gap-right\">\r\n    Trello Auth\r\n  </div>\r\n  <div class=\"trello-list-boards gap-right\">\r\n    Trello List\r\n  </div>\r\n  <div class=\"trello-list-cards\">\r\n    Trello Cards\r\n  </div>\r\n</div>";
  });

return this["JST"];

});