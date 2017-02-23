//instaniate
this.App = {};

//logout function
App.logout = function() {
	Meteor.logout(function(err) {
	});
};


//Configure Routings
Router.configure({
	layoutTemplate: 'loginlayout', //default layout template
	loadingTemplate: 'loading', // loading temaplate
	notFoundTemplate: 'notFound' //404 not found template
});

//Routings
Router.map(function () {
//sign-out route
this.route('/sign-out', {name: 'sign-out',
  onBeforeAction: function () {
		   App.logout(); // app logout see client.js
			 Router.go('login');
  }
});	

//login route
this.route("login",{name: "login",path : "/", controller: "LoginController"}); //landing page

this.route("home",{name: "home",path : "/home", controller: "HomeController"});

this.route("profile",{name: "profile",path : "/home/profile/:_id", controller: "ProfileController"});

/*this.route("register",{name: "register",path : "/home/register", controller: "RegisterController"});

*/
//sign-out route
/*this.route('/sign-out', {name: 'sign-out',
  onBeforeAction: function () {
		   App.logout(); // app logout see client.js
			 Router.go('login');
  }
});*/
});