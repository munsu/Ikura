const Loans = new Mongo.Collection('loans');

export default Loans;

/*
Loan
- clientId
- price
- amtFinanced
- moAmortization
- downpayment
- terms
- createdAt
- payments
  - date
  - amount
*/