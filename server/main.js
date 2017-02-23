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

Meteor.publish("userList", function(id){
    // simulate network latency by sleeping 2s
   Meteor._sleepForMs(2000);
   var loggedInUser = this.userId;
       if (Roles.userIsInRole(loggedInUser,['admin'],'default-group')) {
        return TrackList.find(id);
        }
});

Meteor.publish('tracklist', function() {
  var loggedInUser = this.userId;
   if (Roles.userIsInRole(loggedInUser,['admin'],'default-group')) {
    return TrackList.find();
    }
});

//mobile test
Meteor.publish('mobileTracklist', function() {
  var loggedInUser = this.userId;
    return TrackList.find();
});