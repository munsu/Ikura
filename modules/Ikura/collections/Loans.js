const Loans = new Mongo.Collection('loans');

export default Loans;

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
~ monthlyAmortization
*/