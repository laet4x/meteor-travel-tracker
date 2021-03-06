import '../lib/collection.js';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';

/** Meteor Server Methods **/
Meteor.methods({
    'trackPeople': function(options)
    {
        console.log('Register People', options.full_name);
        //format date
         var date = moment(options.date_entry).format('MMMM Do YYYY, h:mm:ss a');
        console.log(date);
        //insert to database
        var trackList = TrackList.insert({
          full_name: options.full_name,
          date_entry: date,
          origin:options.origin,
          airport_entry:options.airport_entry,
          create_date: new Date()
        });
        return trackList;
    },
     'editTrackList': function(options)
    {
        console.log('Updating Records', options.id);
        //insert to database
        var trackList = TrackList.update(options.id,{
          $set:{
            full_name: options.full_name,
            date_entry: options.date_entry,
            origin:options.origin,
            airport_entry:options.airport_entry
          }
        });
        return trackList;
    }


});
