import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Loans = new Mongo.Collection('loans');

/*
Loan
- _id
- clientId
- cashPrice
- amountFinanced
- downpayment
- terms
- onTimePayment
- createdAt
- payments
  - date
  - amount
  - recorder
  - _id
- isDone
- client
  - firstName
  - lastName
  - identifierDump
- agentId
~ monthlyAmortization
*/

if (Meteor.isServer) {
    Meteor.methods({
      addAgent: function (username) {
        Accounts.createUser({username: username});
      }
    });

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
}

/* Methods */
Meteor.methods({
  addLoan: function (index, name, agentId, cashPrice, downpayment, amountFinanced, terms, onTimePayment, firstPaymentDue) {
    // Make sure the user is logged in before inserting a loan
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    if (cashPrice - downpayment - amountFinanced != 0) {
      throw new Meteor.Error('invalid values');
    }
    // TODO check if admin
    Loans.insert({
      _id: new Mongo.ObjectID(),
      index: parseInt(index),
      name: name,
      agentId: agentId,
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

    Loans.update(loanId, { $set: { isDone: setDone} });
  },
  updateLoanNotes: function (loanId, notes) {
    if (! Meteor.userId()) {
      // TODO permissions
      throw new Meteor.Error('not-authorized');
    }

    Loans.update(loanId, { $set: { notes: notes}});
  }
});


/* Helpers */
Loans.helpers({
  monthlyAmortization: function () {
    // todo set this somewhere else
    return ((this.amountFinanced * 0.025 * this.terms) + this.amountFinanced) / this.terms;
  },
  totalLoan: function () {
    return (this.amountFinanced * 0.025 * this.terms) + this.amountFinanced;
  },
  totalPaid: function () {
    return (this.payments.map(p => p.amount).reduce((p, c) => p + c, 0));
  },
  isPaid: function () {
    return this.totalPaid() >= this.totalLoan();
  },
  nextPaymentDue: function () {
    if (this.payments.length == 0) {
      return moment(this.firstPaymentDue, "YYYY-MM").format("YYYY-MM");
    }
    return moment(this.payments[this.payments.length - 1].date, "YYYY-MM").add(1, 'M').format("YYYY-MM");
  },
  agentName: function () {
    try {
      return Meteor.users.findOne({_id: this.agentId}).username;
    } catch (e) {
      return "Loading";
    }
  },
  displayName: function () {
    if (this.index) {
      return (this.index + ' ' + this.name);
    }
    return this.name;
  }
});

