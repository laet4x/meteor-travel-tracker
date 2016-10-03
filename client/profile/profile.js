import '../../lib/collection.js';
import '../layout/loading.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict'
/*import { PeopleIndex} from '../../lib/collection.js';
import { People} from '../../lib/collection.js';*/
import { $ } from 'meteor/jquery';

Template.Profile.onCreated(function helloOnCreated() {
  // counter starts at 0
  var controller = Iron.controller();
  var id= controller.state.get('id');
  this.profile = this.subscribe("userProfile",id);
  var user = this.data;
  this.filter = new ReactiveTable.Filter('filter_'+user, ["user_id"]);
  this.filter.set(user);
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
		var date_entry = t.find('#date_entry').value;
		var origin = t.find('#origin').value;
		var airport_entry = t.find('#airport_entry').value;

		var controller = Iron.controller();
	    var id= controller.state.get('id');

	    console.log(airport_entry);

		let options = {
			user_id:id,
			date_entry:date_entry,
			origin:origin,
			airport_entry:airport_entry
		}

		submit_button.button("loading");
		
		Meteor.call('trackPeople', options, function(err) {
			submit_button.button("reset");
			if (err)
			{
				console.log('Entry Error');
				pageSession.set("errorMessage", "Error");
				return false;
			}else {
			 	console.log('Entry Sucess');
			 	pageSession.set("errorMessage", "Entry Sucess");
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
	userProfile: function() {
	    var controller = Iron.controller();
	    var id= controller.state.get('id');
        return People.findOne({
            _id:id
        });
	 },
	subscription: function() {
    	return Template.instance().profile.ready();
 	 },
    tracklistTable: function () {

   	 	var controller = Iron.controller();
	    var id= controller.state.get('id');

	    console.log(id);
        return {
            collection: TrackList,
            rowsPerPage: 10,
            showFilter: true,
            filters: ["filter_"+id],
            fields: [ 
                      { key: 'date_entry', label: 'Date of Entry'},
                      { key: 'origin', label: 'Origin'},
                      { key: 'airport_entry', label: 'Airport of Entry' }]
        };
    }
});
