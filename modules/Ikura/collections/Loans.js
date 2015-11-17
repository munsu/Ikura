const Loans = new Mongo.Collection('loans');

export default Loans;

/*
Loan
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
- isDone
~ monthlyAmortization
*/