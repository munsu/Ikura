const Loans = new Mongo.Collection('loans');

export default Loans;

/*
Loan
- clientId
- price
- amountFinanced
- monthlyAmortization
- downpayment
- terms
- createdAt
- payments
  - date
  - amount
*/