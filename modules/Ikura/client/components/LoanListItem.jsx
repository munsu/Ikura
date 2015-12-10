import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';

import Clients from 'Ikura/collections/Clients';

@ReactMixin.decorate(ReactMeteorData)
export default class LoanListItem extends Component {
  static propTypes = {
    loan: PropTypes.object.isRequired,
    setSelectedLoan: PropTypes.func.isRequired
  }
  
  getMeteorData() {
    const client = Clients.find({_id: this.props.loan.clientId}).fetch()[0];
    const agent = Meteor.users.find({_id: client.agentId}).fetch()[0];
    return {
      client,
      agent
    };
  }

  handleClickListItem() {
    this.props.setSelectedLoan(this.props.loan);
  }

  render() {
    let label = null
    if (this.props.loan.isDone) {
      label = (
        <span className="label label-default">Completed</span>
      )
    }

    return (
      <li className="list-group-item">
        <div className="list-group-item-heading">
          <h4>
            <a href="#" onClick={this.handleClickListItem.bind(this)} data-toggle="modal" data-target="#loandetailmodal">{this.data.client.name()} - &#x20b1;{this.props.loan.amountFinanced}</a>
            &nbsp;{label}
          </h4>
        </div>
        <span className="list-group-item-text">{this.data.agent.username}</span>
      </li>
    );
  }
}
