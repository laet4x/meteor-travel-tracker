import '../lib/collection.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict'
/*import { PeopleIndex} from '../lib/collection.js';
import { People} from '../lib/collection.js';*/
import { $ } from 'meteor/jquery';


Meteor.subscribe('tracklist');

var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

Template.Home.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.Home.helpers({
	/*inputAttributes: function () {
		return { 'class': 'form-control', 'placeholder': 'Start searching...' };
	},
	people: function () {
		return People.find({}, { sort: { score: -1, name: 1 } });
	},
	resultsCount: function () {
		return PeopleIndex.getComponentDict().get('count');
	},
	showMore: function () {
		return false;
	},
    tracklistTable: function () {
        return {
            collection: TrackList,
            rowsPerPage: 10,
            showFilter: true,
            fields: [ 
                      { key: 'date_entry', label: 'Date of Entry'},
                      { key: 'origin', label: 'Origin'},
                      { key: 'airport_entry', label: 'Airport of Entry' }]
        };
    },
 	PeopleIndex: () => PeopleIndex*/
 	tracklistTable: function () {

        return {
            collection: TrackList,
            rowsPerPage: 10,
            showFilter: true,
            fields: [ 
            		  { key: 'full_name', label: 'Full Name'},
                      { key: 'date_entry', label: 'Date of Entry'},
                      { key: 'origin', label: 'Origin'},
                      { key: 'airport_entry', label: 'Airport of Entry' }]
        };
    }
});

Template.Home.events({
 "submit #tracker_form": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");
		var submit_button = $(t.find(":submit"));

		var full_name = t.find('#full_name').value;
		var date_entry = t.find('#date_entry').value;
		var origin = t.find('#origin').value;
		var airport_entry = t.find('#airport_entry').value;

	    console.log(airport_entry);

		let options = {
			full_name:full_name,
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
			    Router.go("home");
			}
		});
		return false;
	}
});
