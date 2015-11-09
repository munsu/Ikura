import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Clients from 'Ikura/collections/Clients';

@ReactMixin.decorate(ReactMeteorData)
export default class LoanModal extends Component {
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
    console.log(month)
    console.log(amount)
    console.log(this.props.loan.payments)
    console.log(this.props.info)
    Meteor.call('addPayment', this.props.loan._id, month, amount);

    // Clear form
    event.target.month.value = '';
    event.target.amount.value = '';
  }

  loadDate(e) {
    let date = moment().format("YYYY-MM")
    e.target.value = date
  }

  // TODO amount default value to 
  render() {
    let modal_id = "modal-" + this.props.loan._id
    let payments = null
    return (
      <div className="modal" id={modal_id} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{this.data.client.firstName} {this.data.client.lastName}</h4>
            </div>
            <div className="modal-body">
              <table className="table table-compressed">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.loan.payments.map(payment =>
                    <tr key={payment._id}>
                      <td>{moment(payment.date, "YYYY-MM").format("MMM YYYY")}</td>
                      <td>{payment.amount}</td>
                    </tr>)}
                </tbody>
              </table>
              <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <input type="month" name="month" onClick={this.loadDate.bind(this)} />
                <input type="number" name="amount" />
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
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
