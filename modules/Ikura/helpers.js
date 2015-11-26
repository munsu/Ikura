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
  },
  nextPaymentDue: function () {
    if (this.payments.length == 0) {
      return moment(this.firstPaymentDue, "YYYY-MM").format("YYYY-MM");
    }
    return moment(this.payments[this.payments.length - 1].date, "YYYY-MM").add(1, 'M').format("YYYY-MM");
  }
});
