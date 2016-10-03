import '../lib/collection.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
/*import { PeopleIndex} from '../lib/collection.js';
import { People} from '../lib/collection.js';*/
import { $ } from 'meteor/jquery';

Template.Home.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  console.log(PeopleIndex);
  console.log(People);
});

Template.Home.helpers({
	inputAttributes: function () {
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
 	PeopleIndex: () => PeopleIndex
});

Template.Home.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
