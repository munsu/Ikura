import Clients from 'Ikura/collections/Clients';
import Loans from 'Ikura/collections/Loans';

Clients.helpers({
  fullName: function () {
    return (this.firstName + " " + this.lastName);
  }
});

Loans.helpers({
  monthlyAmortization: function () {
    // todo set this somewhere else
    return ((this.amountFinanced * 0.025 * this.terms) + this.amountFinanced) / this.terms;
  }
});
