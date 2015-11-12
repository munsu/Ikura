import Loans from 'Ikura/collections/Loans';

Loans.helpers({
  monthlyAmortization: function () {
    // todo set this somewhere else
    return ((this.amountFinanced * 0.025 * this.terms) + this.amountFinanced) / this.terms;
  }
});
