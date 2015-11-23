import Clients from 'Ikura/collections/Clients';
import Loans from 'Ikura/collections/Loans';

Clients.helpers({
  name: function () {
    if (this.firstName && this.lastName) {
      return (this.firstName + " " + this.lastName);
    } else {
      return (this.identifierDump);
    }
  }
});

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
  }
});
