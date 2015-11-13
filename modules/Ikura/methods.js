import Clients from 'Ikura/collections/Clients';
import Loans from 'Ikura/collections/Loans';

Meteor.methods({
  addClient: function (agentId, firstName, lastName) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Clients.insert({
      _id: new Mongo.ObjectID(),
      agentId: agentId,
      firstName: firstName,
      lastName: lastName,
      createdAt: new Date()
    });
  },
  addLoan: function (clientId, cashPrice, downpayment, amountFinanced, terms, onTimePayment, firstPaymentDue) {
    // Make sure the user is logged in before inserting a loan
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    if (cashPrice - downpayment - amountFinanced != 0) {
      throw new Meteor.Error('invalid values');
    }
    // TODO check if admin
    console.log(clientId)
    Loans.insert({
      _id: new Mongo.ObjectID(),
      clientId: new Mongo.ObjectID(clientId),
      cashPrice: parseFloat(cashPrice),
      downpayment: parseFloat(downpayment),
      amountFinanced: parseFloat(amountFinanced),
      terms: parseFloat(terms),
      onTimePayment: parseFloat(onTimePayment),
      payments: [],
      firstPaymentDue: firstPaymentDue,
      createdAt: new Date()
    });
  },
  addPayment: function (loanId, date, amount) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Loans.update(
      loanId,
      {
        $addToSet: {
          payments: {
            _id: new Mongo.ObjectID(),
            date: date,
            amount: parseFloat(amount),
            recorder: Meteor.userId() } } }
    );
  },
  removePayment: function (loanId, paymentId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Loans.update(
      loanId,
      {
        $pull: {
          payments: {
            _id: paymentId
          }
        }
      }
    );
  },
  setDone: function (loanId, setDone) {
    if (! Meteor.userId()) {
      // TODO permissions
      throw new Meteor.Error('not-authorized');
    }

    Loans.update(loanId, { $set: { done: setDone} });
  }
});
