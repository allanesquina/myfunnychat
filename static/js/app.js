App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.route("chat", { path: "/chat" });
});

App.IndexRoute = Ember.Route.extend({
  
});
App.ChatRoute = Ember.Route.extend({
  setupController: function(controller) {
    // Control.Chat.connect();    
  }  
});
