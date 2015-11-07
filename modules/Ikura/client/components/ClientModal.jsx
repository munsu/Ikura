import { Component, PropTypes } from 'react';
import moment from 'moment';
import ReactMixin from 'react-mixin';
import LoanEntry from './LoanEntry';

import Loans from 'Ikura/collections/Loans';

@ReactMixin.decorate(ReactMeteorData)
export default class ClientModal extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired
  }
  
  getMeteorData() {
    Meteor.subscribe('loans');
    Meteor.subscribe('userData');

    let loanFilter = {};

    loanFilter.client_id = this.props.client._id
    if (this.props.hideCompleted) {
      loanFilter.paid = {$ne: true};
    }

    const loans = Loans.find(loanFilter, {sort: {createdAt: -1}}).fetch();

    return {
      loans,
      user: Meteor.user()
    };
  }
  // handleChecked(e) {
  //   // Set the checked property to the opposite of its current value
  //   Meteor.call('setChecked', this.props.task._id, e.target.checked);
  // }

  // handleDelete() {
  //   Meteor.call('deleteTask', this.props.task._id);
  // }

  // handleSetPrivate() {
  //   Meteor.call('setPrivate', this.props.task._id, !this.props.task.private);
  // }

  // renderTogglePrivate() {
  //   if (Meteor.userId() !== this.props.task.owner) {
  //     return null;
  //   }

  //   return (
  //     <button className="toggle-private" onClick={this.handleSetPrivate.bind(this)}>
  //       {this.props.task.private ? 'Private' : 'Public'}
  //     </button>
  //   );
  // }

  handleSubmit(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.month.value;

    // Insert a task into the collection
    // Meteor.call('addTask', text);

    console.log(text)
    // Clear form
    event.target.month.value = '';
  }

  render() {
    let modal_id = "modal-" + this.props.client._id
    let date = moment().format("YYYY-MM")
    return (
      <div className="modal" id={modal_id} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Add payment</h4>
            </div>
            <div className="modal-body">
              <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <input type="month" name="month" value={date} />
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
