import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
// import LoanEntry from './LoanEntry';

// import Loans from 'Ikura/collections/Loans';

// @ReactMixin.decorate(ReactMeteorData)
export default class ClientEntry extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
    client: PropTypes.object.isRequired
  }
  
  // getMeteorData() {
  //   Meteor.subscribe('loans');

  //   let loanFilter = {};

  //   loanFilter.client_id = client._id
  //   if (this.props.hideCompleted) {
  //     loanFilter.paid = {$ne: true};
  //   }

  //   const loans = Loans.find(loanFilter, {sort: {createdAt: -1}}).fetch();

  //   return {
  //     loans,
  //     user: Meteor.user()
  //   };
  // }
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

  render() {
    return (
      <li>
        <div>{this.props.client.firstName}</div>
        
      </li>
    );
  }
}
