import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class LoanEnrollmentModal extends Component {

  computeInput(event) {
    let form = event.target.form;

    if (['downpayment', 'cashPrice', 'terms'].includes(event.target.name)) {
      // compute the readonly fields (amountFinanced, monthlyAmortization)
      form.amountFinanced.value = parseFloat(form.cashPrice.value) - parseFloat(form.downpayment.value);
      form.monthlyAmortization.value = ((parseFloat(form.amountFinanced.value) * 0.025 * parseFloat(form.terms.value)) + parseFloat(form.amountFinanced.value)) / parseFloat(form.terms.value);
    }
  }

  handleSubmit(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Form values
    const loanIndex = event.target.loanIndex.value;
    const loanName = event.target.loanName.value;
    const selectAgent = event.target.selectAgent.value;
    const cashPrice = event.target.cashPrice.value;
    const downpayment = event.target.downpayment.value;
    const amountFinanced = parseFloat(cashPrice) - parseFloat(downpayment);
    const terms = event.target.terms.value;
    const onTimePayment = event.target.onTimePayment.value;
    const firstPaymentDue = event.target.firstPaymentDue.value;
    Meteor.call('addLoan', loanIndex, loanName, selectAgent, cashPrice, downpayment, amountFinanced, terms, onTimePayment, firstPaymentDue, function(error, result) {
      if (error){
        toastr.warning('<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Failed to create new loan.');
      } else {
        toastr.success('<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Created new loan, ' + loanIndex + ' ' + loanName + '.');
      }
    });

    // Reset form
    event.target.reset();
    $('#newloan').modal('hide');
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
                {/* Loan */}
                <div className="form-group">
                  <label htmlFor="input-loan-index" className="col-sm-4 control-label">Index</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-loan-index" name="loanIndex" placeholder="Index" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="input-loan-name" className="col-sm-4 control-label">Name</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="input-loan-name" name="loanName" placeholder="Name" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="select-agent" className="col-sm-4 control-label">Agent</label>
                  <div className="col-sm-8">
                    <select className="form-control" id="select-agent" name="selectAgent">
                      {this.props.agents.map(agent =>
                        <option key={agent._id} value={agent._id}>{agent.username}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="input-cash-price" className="col-sm-4 control-label">Cash Price</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-cash-price" name="cashPrice" defaultValue="0" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="input-downpayment" className="col-sm-4 control-label">Downpayment</label>
                  <div className="col-sm-8">
                    <input type="number" className="form-control" id="input-downpayment" name="downpayment" defaultValue="0" required />
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
                    <input type="number" className="form-control" id="input-terms" name="terms" defaultValue="0" required />
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

LoanEnrollmentModal.propTypes = {
    agents: PropTypes.array.isRequired,
}