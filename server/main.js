import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.startup(() => {
  // code to run on server at startup
  if(Meteor.users.find().count() === 0){
	  var users = [{name:"Admin User",email:"admin@custom.com",roles:['admin']}];

	        _.each(users, function (user) {
	        var id;

	              id = Accounts.createUser({
	                email: user.email,
	                username: 'Adminitrator',
	                password: "AdminUser123!",
	                profile: { name: user.name }
	              });

	                if (user.roles.length > 0) {
	                  // Need _id of existing user record so this call must come
	                  // after `Accounts.createUser` or `Accounts.onCreate`
	                Roles.addUsersToRoles(id, user.roles, 'default-group');
	              }

	        });
	}        
});

Meteor.publish("userProfile", function(id){
    // simulate network latency by sleeping 2s
    Meteor._sleepForMs(2000);
    // try to find the user by username
    var user =Meteor.users.findOne({
        _id:id
    });
    // if we can't find it, mark the subscription as ready and quit
    if(!user){
        this.ready();
        return;
    }
    // if the user we want to display the profile is the currently logged in user...
    if(this.userId==user._id){
        // then we return the corresponding full document via a cursor
        return People.find(this.userId);
    }
    else{
        // if we are viewing only the public part, strip the "profile"
        // property from the fetched document, you might want to
        // set only a nested property of the profile as private
        // instead of the whole property
        return People.find(user._id);
    }
});

Meteor.publish('tracklist', function() {
  var loggedInUser = this.userId;
   if (Roles.userIsInRole(loggedInUser,['admin'],'default-group')) {
    return TrackList.find();
    }
});