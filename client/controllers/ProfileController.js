this.ProfileController = RouteController.extend({
  layoutTemplate: 'loginlayout',
  template: "Profile",
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
	//wait for subscription
    waitOn:function(){
        return Meteor.subscribe("userList",this.params._id);
    },
    //data user in profile Controller
    data:function(){
        var id=Router.current().params._id;
        return id;
    },
    action: function () {
    // set the reactive state variable "username" with a value
    // of the username from our url
    this.state.set('id', this.params._id);
    this.render();
    }
});
