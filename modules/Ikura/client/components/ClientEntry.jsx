import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import LoanEntry from './LoanEntry';

import Loans from 'Ikura/collections/Loans';

@ReactMixin.decorate(ReactMeteorData)
export default class ClientEntry extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
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
      agent: Meteor.users.find({_id: this.props.client.agentId}).fetch()[0],
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

  render() {
    let modal_id = "#modal-" + this.props.client._id
    return (
      <button type="button" className="list-group-item" data-toggle="modal" data-target={modal_id}>
        <h4 className="list-group-item-heading">{this.props.client.firstName}</h4>
        <span className="list-group-item-text">{this.data.agent.username}</span>
      </button>
    );
  }
}
