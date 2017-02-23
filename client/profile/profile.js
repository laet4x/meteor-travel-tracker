import '../../lib/collection.js';
import '../layout/loading.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict'
/*import { PeopleIndex} from '../../lib/collection.js';
import { People} from '../../lib/collection.js';*/
import { $ } from 'meteor/jquery';

Template.Profile.onCreated(function helloOnCreated() {
  var controller = Iron.controller();
  var id= controller.state.get('id');
  this.profile = this.subscribe("userList",id);
});


var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

Template.Profile.rendered = function() {

	$("input[autofocus]").focus();
};
Template.Profile.created = function() {
	pageSession.set("errorMessage", "");
};

Template.Profile.events({
	"submit #profile_form": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");
		var submit_button = $(t.find(":submit"));
		var full_name = t.find('#full_name').value;
		var date_entry = t.find('#date_entry').value;
		var origin = t.find('#origin').value;
		var airport_entry = t.find('#airport_entry').value;

		var controller = Iron.controller();
	    var id= controller.state.get('id');

	    console.log(id);

		let options = {
			id:id,
			full_name:full_name,
			date_entry:date_entry,
			origin:origin,
			airport_entry:airport_entry
		}

		submit_button.button("loading");
		
		Meteor.call('editTrackList', options, function(err) {
			submit_button.button("reset");
			if (err)
			{
				console.log('Update Error');
				pageSession.set("errorMessage", "Error");
				return false;
			}else {
			 	console.log('Update Sucess');
			 	pageSession.set("errorMessage", "Update Sucess");
			    Router.go("/home/profile/" + id);
			}
		});
		return false;
	}
});

Template.Profile.helpers({
	errorMessage: function() {
	  return pageSession.get("errorMessage");
	},
	userTrackList: function() {
	    var controller = Iron.controller();
	    var id= controller.state.get('id');
        return TrackList.findOne({
            _id:id
        });
	 },
	subscription: function() {
    	return Template.instance().profile.ready();
 	 }
});
