import '../lib/collection.js';
import { Meteor } from 'meteor/meteor';
/** Meteor Server Methods **/
Meteor.methods({
  'registerPeople': function(options)
    {
        console.log('Register People', options.name);
        var peopleInsert = People.insert({
          name: options.name,
          dateofbirth:options.dateofbirth,
          address:options.address
        });
        return peopleInsert;
    },
    'trackPeople': function(options)
    {
        console.log('Register People', options.user_id);
        var trackList = TrackList.insert({
          user_id: options.user_id,
          date_entry: options.date_entry,
          origin:options.origin,
          airport_entry:options.airport_entry,
          create_date: new Date()
        });
        return trackList;
    }
});