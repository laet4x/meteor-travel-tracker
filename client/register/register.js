import '../../lib/collection.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict'
/*import { PeopleIndex} from '../../lib/collection.js';
import { People} from '../../lib/collection.js';*/
import { $ } from 'meteor/jquery';

/*Template.Login.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  this.pageSession = new ReactiveDict();
});

*/
var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

Template.Register.rendered = function() {

	$("input[autofocus]").focus();
};
Template.Register.created = function() {
	pageSession.set("errorMessage", "");
};

Template.Register.events({
	"submit #register_form": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");
		var submit_button = $(t.find(":submit"));
		var name = t.find('#name').value.trim();
		var dateofbirth = t.find('#dateofbirth').value;
		var address= t.find('#address').value;

		let options = {
			name:name,
			dateofbirth:dateofbirth,
			address:address
		}

		submit_button.button("loading");
		
		Meteor.call('registerPeople', options, function(err) {
			submit_button.button("reset");
			if (err)
			{
				console.log('Registering Error');
				pageSession.set("errorMessage", "Error");
				return false;
			}else {
			 	console.log('Registered Sucess');
			 	pageSession.set("errorMessage", "Registered Sucess");
			    Router.go("register");
			}
		});
		return false;
	}
});

Template.Register.helpers({
	errorMessage: function() {
	  return pageSession.get("errorMessage");
	}
});
