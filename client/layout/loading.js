import { ReactiveDict } from 'meteor/reactive-dict'

var Session = new ReactiveDict();

Template.loading.rendered = function () {
  if (!Session.get('loadingSplash') ) {
    this.loading = window.pleaseWait({
      logo: '/assets/image/Meteor-logo.png',
      backgroundColor: '#37775d',
      loadingHtml: message + spinner
    });
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.loading.destroyed = function () {
  if ( this.loading ) {
    this.loading.finish();
  }
};

var message = '<p class="loading-message">Loading Profile</p>';
var spinner = '<div class="spinner"><div class="dot1"></div><div class="dot2"></div></div>';
