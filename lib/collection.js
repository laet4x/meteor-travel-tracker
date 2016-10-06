import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { EasySearch } from 'meteor/easy:search';
import { _ } from 'meteor/underscore';



TrackList= new Mongo.Collection('tracklist');

var Schemas = {};

Schemas.TrackList= new SimpleSchema({
	full_name: {type: String},
    date_entry: {type: String},
    origin: {type: String},
 	airport_entry: {type: String},
 	create_date: {type: Date}
});
TrackList.attachSchema(Schemas.TrackList);
