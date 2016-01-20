import Loans from 'Ikura/collections/Loans';

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
