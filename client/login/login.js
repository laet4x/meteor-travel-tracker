import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict'

/*Template.Login.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  this.pageSession = new ReactiveDict();
});


*/
var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

Template.Login.rendered = function() {

	$("input[autofocus]").focus();
};
Template.Login.created = function() {
	pageSession.set("errorMessage", "");
};

Template.Login.events({
	"submit #login_form": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var submit_button = $(t.find(":submit"));
		var login_email = t.find('#login_email').value.trim();
		var login_password = t.find('#login_password').value;

		// check password
		if(login_password == "")
		{
			pageSession.set("errorMessage", "Please enter your password.");
			t.find('#login_email').focus();
			return false;
		}

		submit_button.button("loading");
		Meteor.loginWithPassword(login_email, login_password, function(err) {
			submit_button.button("reset");
			if (err)
			{
				console.log('Error Login');
				pageSession.set("errorMessage", "Invalid Accounts");
				return false;
			}else {
			 	console.log('Login Sucess');
			   Router.go("home");
			}
		});
		return false;
	}
});

Template.Login.helpers({
	errorMessage: function() {
	  return pageSession.get("errorMessage");
	}
});
