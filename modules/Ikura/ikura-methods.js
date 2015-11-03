import Clients from 'Ikura/collections/Clients';
import Loans from 'Ikura/collections/Loans';

Meteor.methods({
  addLoan: function (clientId, price, amtFinanced, moAmortization, downpayment, terms) {
    // Make sure the user is logged in before inserting a loan
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    // TODO check if admin

    // TODO check clients
    Clients.insert({
      name: name,
      agentId: Meteor.userId(),
    });

    Loans.insert({
      clientId: clientId,
      price: price,
      amtFinanced: amtFinanced,
      moAmortization: moAmortization,
      downpayment: downpayment,
      terms: terms,
      createdAt: new Date(),  // default thing
    });
  },
  addPayment: function (loanId, month, year, amount) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    // validate month year amount
    // new Date(year, month)
    const d = new Date(year, month)
    Loans.update(
      loanId,
      {
        $addToSet: {
          payments: {
            date: d,
            amount: amount,
            recorder: Meteor.userId() } } }
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
