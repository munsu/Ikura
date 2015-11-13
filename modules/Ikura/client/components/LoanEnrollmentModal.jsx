import { Component, PropTypes } from 'react';


export default class LoanEnrollmentModal extends Component {
  static propTypes = {
    clients: PropTypes.array.isRequired
  }

  handleSubmit(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var selectClient = event.target.selectClient.value;
    var cashPrice = event.target.cashPrice.value;
    var downpayment = event.target.downpayment.value;
    var amountFinanced = parseFloat(cashPrice) - parseFloat(downpayment);
    var terms = event.target.terms.value;
    var onTimePayment = event.target.onTimePayment.value;
    var firstPaymentDue = event.target.firstPaymentDue.value;

    Meteor.call('addLoan', selectClient, cashPrice, downpayment, amountFinanced, terms, onTimePayment, firstPaymentDue);

    // Clear amount input
    // event.target.firstName.value = '';
    // event.target.lastName.value = '';
  }

  render() {
    return (
      <div className="modal" id="newloan" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">New Loan</h4>
            </div>

            <div className="modal-body">
              <form className="form-horizontal" id="newLoanForm" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label htmlFor="select-client" className="col-sm-4 control-label">Client</label>
                  <div className="col-sm-8">
                    <select className="form-control" id="select-client" name="selectClient">
                      {this.props.clients.map(client =>
                        <option key={client._id} value={client._id}>{client.fullName()}</option>)}
                    </select>
                  </div> 
                </div>

                <hr />

                <div className="form-group">
                  <label htmlFor="input-cash-price" className="col-sm-4 control-label">Cash Price</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-cash-price" name="cashPrice" placeholder="Cash Price" />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-downpayment" className="col-sm-4 control-label">Downpayment</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-downpayment" name="downpayment" placeholder="Downpayment" />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-amount-financed" className="col-sm-4 control-label">Amount Financed</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-amount-financed" name="amountFinanced" placeholder="Amount Financed" tabIndex="-1" readOnly />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-terms" className="col-sm-4 control-label">Terms</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-terms" name="terms" placeholder="Terms" />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-monthly-amortization" className="col-sm-4 control-label">Monthly Amortization</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-monthly-amortization" name="monthlyAmortization" placeholder="0" tabIndex="-1" readOnly />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-on-time-payment" className="col-sm-4 control-label">On Time Payment</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-on-time-payment" name="onTimePayment" placeholder="On Time Payment" />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-first-payment-due" className="col-sm-4 control-label">First Payment Due</label>
                  <div className="col-sm-8">
                    <input type="month" className="form-control" id="input-first-payment-due" name="firstPaymentDue" defaultValue={moment().format("YYYY-MM")} />
                  </div> 
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" form="newLoanForm" value="submit">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}