import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Clients from 'Ikura/collections/Clients';

@ReactMixin.decorate(ReactMeteorData)
export default class LoanListItem extends Component {
  static propTypes = {
    loan: PropTypes.object.isRequired
  }
  
  getMeteorData() {
    const client = Clients.find({_id: this.props.loan.clientId}).fetch()[0];
    const agent = Meteor.users.find({_id: client.agentId}).fetch()[0];
    return {
      client,
      agent
    };
  }

  render() {
    let modal_id = "#modal-" + this.props.loan._id
    return (
      <li className="list-group-item">
        <a href="#" data-toggle="modal" data-target={modal_id}>
          <h4 className="list-group-item-heading">{this.data.client.name()} - &#x20b1;{this.props.loan.amountFinanced}</h4>
        </a>
          <span className="list-group-item-text">{this.data.agent.username}</span>
      </li>
    );
  }
}
