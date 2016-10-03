import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { EasySearch } from 'meteor/easy:search';
import { _ } from 'meteor/underscore';


People = new Mongo.Collection('people');
TrackList= new Mongo.Collection('tracklist');

var Schemas = {};

Schemas.People = new SimpleSchema({
    name: {type: String},
    dateofbirth: {type: Date},
    address: {type: String}
});
People.attachSchema(Schemas.People);
  
PeopleIndex = new EasySearch.Index({
    collection: People,
    fields: ['name'],
    engine: new EasySearch.Minimongo()
});

Schemas.TrackList= new SimpleSchema({
	user_id: {type: String},
    date_entry: {type: Date},
    origin: {type: String},
 	airport_entry: {type: String},
 	create_date: {type: Date}
});
TrackList.attachSchema(Schemas.TrackList);
