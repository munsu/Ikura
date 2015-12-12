import { Component, PropTypes } from 'react';

export default class LoanDetailModal extends Component {
  static propTypes = {
    loan: PropTypes.any
  }

  handleSubmit(event) {
    // Prevent default browser form submit
    event.preventDefault();

    const month = event.target.month.value;
    const amount = event.target.amount.value;

    Meteor.call('addPayment', this.props.loan._id, month, amount, (error, result) => {
      // Reset form
      console.log("WHUT")
      event.target.reset();
      event.target.month.value = this.props.loan.nextPaymentDue();});
      this.forceUpdate();
  }

  handleDeletePayment(paymentId) {
    Meteor.call('removePayment', this.props.loan._id, paymentId, (error, result) => {
      this.forceUpdate();
    });
  }

  handleMarkAsDone(event) {
    Meteor.call('setDone', this.props.loan._id, event.target.checked, (error, result) => {
      this.forceUpdate();
    });

  }

  handleTextInput(event) {
    Meteor.call('updateLoanNotes', this.props.loan._id, event.target.value, (error, result) => {
      this.forceUpdate();
    });
  }

  render() {
    let payments = null
    return (
      <div className="modal" id="loandetailmodal" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          {this._modalContent()}
        </div>
      </div>
    );
  }

  _modalContent() {
    if (!this.props.loan) {
      return (
        <div className="modal-content">
          <span>Loading</span>
        </div>
      )
    } else {
      return (
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">{this.props.loan.clientName()}</h4>
          </div>

          <div className="modal-body row">
            {/* Payments */}
            <div className="col-md-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <span className="h4">Payments</span>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th><span className="glyphicon glyphicon-cog pull-right"></span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.loan.payments.sort((a, b) =>
                      a.date > b.date ? 1 : -1).map((payment, index) =>
                        <tr key={payment._id}>
                          <th>{index + 1}</th>
                          <td>{moment(payment.date, "YYYY-MM").format("MMM YYYY")}</td>
                          <td>{payment.amount}</td>
                          <td><button className="close" onClick={this.handleDeletePayment.bind(this, payment._id)}>&times;</button></td>
                        </tr>)}
                  </tbody>
                </table>
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                  <input type="month" name="month" defaultValue={this.props.loan.nextPaymentDue()} required />
                  <input type="number" name="amount" required />
                </form>
              </div>
            </div>

            {/* Metrics and Additional actions */}
            <div className="col-md-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <span className="h4">Metrics</span>
                </div>
                <table className="table table-condensed">
                  <tbody>
                    <tr>
                      <th>Cash Price</th>
                      <td>{this.props.loan.cashPrice}</td>
                    </tr>
                    <tr>
                      <th>Amount Financed</th>
                      <td>{this.props.loan.amountFinanced}</td>
                    </tr>
                    <tr>
                      <th>Monthly Amortization</th>
                      <td>{this.props.loan.monthlyAmortization()}</td>
                    </tr>
                    <tr>
                      <th>On Time Payment</th>
                      <td>{this.props.loan.onTimePayment}</td>
                    </tr>
                    <tr>
                      <th>Terms</th>
                      <td>{this.props.loan.terms}</td>
                    </tr>
                    <tr>
                      <th>Downpayment</th>
                      <td>{this.props.loan.downpayment}</td>
                    </tr>
                    <tr>
                      <th>Total Paid</th>
                      <td><p className={(this.props.loan.isPaid() ? 'bg-success' : 'bg-warning')}>{this.props.loan.totalPaid()}</p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <span className="h4">Options</span>
                </div>
                <div className="panel-body">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" checked={this.props.loan.isDone} onChange={this.handleMarkAsDone.bind(this)} />
                      Mark loan as done
                    </label>
                  </div>
                  <textarea className="form-control" rows="3" onChange={this.handleTextInput.bind(this)} placeholder="Notes" value={this.props.loan.notes}></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      )
    }
  }
}
