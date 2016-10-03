this.RegisterController = RouteController.extend({
  layoutTemplate: 'homelayout',
  template: "Register",


	yieldRegions: {
    'MyNav': {to: 'nav'},
    'MyFooter': {to: 'footer'}
  },


	onBeforeAction: function() {
 	var loggedInUser = Meteor.user();
  		if (!Meteor.user() || !Roles.userIsInRole(loggedInUser,['admin'],'default-group')) {
    		Router.go("login");
    		pause();
				}
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		var subs = [
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {


		return {
			message : "Travel Tracker Login"
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {

	}
});
