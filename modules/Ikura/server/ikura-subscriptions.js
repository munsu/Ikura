import Clients from 'Ikura/collections/Clients';
import Loans from 'Ikura/collections/Loans';

// This code only runs on the server
Meteor.publish('clients', function () {
  // TODO if admin
  // return all
  /*{ agentId: this.userId }*/
  return Clients.find();
});

Meteor.publish('loans', function () {
  return Loans.find();
});
