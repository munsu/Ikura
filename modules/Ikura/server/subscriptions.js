import Loans from 'Ikura/collections/Loans';

// This code only runs on the server
Meteor.publish('loans', function () {
  return Loans.find();
});

Meteor.publish('userData', function () {
    return Meteor.users.find();
})