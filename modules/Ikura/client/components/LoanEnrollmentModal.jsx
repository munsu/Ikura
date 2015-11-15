import { Component, PropTypes } from 'react';


export default class LoanEnrollmentModal extends Component {
  static propTypes = {
    clients: PropTypes.array.isRequired
  }

  computeInput(event) {
    if (['downpayment', 'cashPrice', 'terms'].includes(event.target.name)) {
      // compute the readonly fields (amountFinanced, monthlyAmortization)
      var form = event.target.form;
      form.amountFinanced.value = parseFloat(form.cashPrice.value) - parseFloat(form.downpayment.value);
      form.monthlyAmortization.value = ((parseFloat(form.amountFinanced.value) * 0.025 * parseFloat(form.terms.value)) + parseFloat(form.amountFinanced.value)) / parseFloat(form.terms.value);
    } else if ('selectClient' === event.target.name) {
      // show/hide the new client form
      if (event.target.selectedIndex === 0) {
        $('.collapse').collapse('show');
      } else {
        $('.collapse').collapse('hide');
      }
    }
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
              <form className="form-horizontal" id="newLoanForm" onChange={this.computeInput.bind(this)} onSubmit={this.handleSubmit.bind(this)}>
                {/* Client */}
                <div className="form-group">
                  <label htmlFor="select-client" className="col-sm-4 control-label">Client</label>
                  <div className="col-sm-8">
                    <select className="form-control" id="select-client" name="selectClient">
                      <option value="new">New Client</option>
                      {this.props.clients.map(client =>
                        <option key={client._id} value={client._id}>{client.fullName()}</option>)}
                    </select>
                  </div> 
                </div>
                <div className="collapse in" id="clientCollapse">
                  <div className="well">
                    <div className="form-group">
                      <label htmlFor="input-first-name" className="col-sm-4 control-label">First Name</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control" id="input-first-name" name="firstName" placeholder="First Name" required />
                      </div> 
                    </div>
                    <div className="form-group">
                      <label htmlFor="input-last-name" className="col-sm-4 control-label">Last Name</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control" id="input-last-name" name="lastName" placeholder="Last Name" required />
                      </div> 
                    </div>
                    <div className="form-group">
                      <label htmlFor="select-agent" className="col-sm-4 control-label">Agent</label>
                      <div className="col-sm-8">
                        <select className="form-control" id="select-agent" name="selectAgent">
                          {Meteor.users.find().fetch().map(user =>
                            <option key={user._id} value={user._id}>{user.username}</option>)}
                        </select>
                      </div> 
                    </div>
                  </div>
                </div>

                <hr />
                {/* Loan */}
                <div className="form-group">
                  <label htmlFor="input-cash-price" className="col-sm-4 control-label">Cash Price</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-cash-price" name="cashPrice" defaultValue="0" />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-downpayment" className="col-sm-4 control-label">Downpayment</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-downpayment" name="downpayment" defaultValue="0" />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-amount-financed" className="col-sm-4 control-label">Amount Financed</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-amount-financed" name="amountFinanced" defaultValue="0" tabIndex="-1" readOnly />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-terms" className="col-sm-4 control-label">Terms</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-terms" name="terms" defaultValue="0" />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-monthly-amortization" className="col-sm-4 control-label">Monthly Amortization</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-monthly-amortization" name="monthlyAmortization" defaultValue="0" tabIndex="-1" readOnly />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-on-time-payment" className="col-sm-4 control-label">On Time Payment</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-on-time-payment" name="onTimePayment" defaultValue="0" />
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