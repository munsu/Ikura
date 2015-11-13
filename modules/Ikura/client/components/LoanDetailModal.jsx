import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Clients from 'Ikura/collections/Clients';

@ReactMixin.decorate(ReactMeteorData)
export default class LoanDetailModal extends Component {
  static propTypes = {
    loan: PropTypes.object.isRequired
  }

  getMeteorData() {
    return {
      client: Clients.find(this.props.loan.clientId).fetch()[0]
    }
  }

  handleSubmit(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var month = event.target.month.value;
    var amount = event.target.amount.value;

    Meteor.call('addPayment', this.props.loan._id, month, amount);

    // Clear amount input
    event.target.amount.value = '';
  }

  handleDeletePayment(paymentId) {
    Meteor.call('removePayment', this.props.loan._id, paymentId);
  }

  render() {
    let modal_id = "modal-" + this.props.loan._id
    let payments = null
    return (
      <div className="modal" id={modal_id} role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{this.data.client.firstName} {this.data.client.lastName}</h4>
            </div>

            <div className="modal-body row">
              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    Add Payment
                  </div>
                  <table className="table table-condensed">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th><span className="glyphicon glyphicon-cog pull-right"></span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.loan.payments.sort((a, b) =>
                        a.date > b.date ? 1 : -1).map(payment =>
                          <tr key={payment._id}>
                            <td>{moment(payment.date, "YYYY-MM").format("MMM YYYY")}</td>
                            <td>{payment.amount}</td>
                            <td><button className="close" onClick={this.handleDeletePayment.bind(this, payment._id)}>&times;</button></td>
                          </tr>)}
                    </tbody>
                  </table>
                  <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="month" name="month" defaultValue={moment().format("YYYY-MM")} required />
                    <input type="number" name="amount" required />
                  </form>
                </div>
              </div>

              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    Metrics
                  </div>
                  <table className="table table-condensed">
                    <tbody>
                      <tr>
                        <th>Cash Price</th>
                        <td>{this.props.loan.price}</td>
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
                        <td>{this.props.loan.payments.map(p => p.amount).reduce((p, c) => p + c, 0)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
