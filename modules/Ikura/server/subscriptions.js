import Loans from 'Ikura/collections/Loans';

// This code only runs on the server
Meteor.publish('loans', function () {
  if (this.userId) {
    return Loans.find();
  }
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find();
  }
})