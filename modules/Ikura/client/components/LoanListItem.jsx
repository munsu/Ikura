import { Component, PropTypes } from 'react';

import Clients from 'Ikura/collections/Clients';

export default class LoanListItem extends Component {
  static propTypes = {
    loan: PropTypes.object.isRequired,
    setSelectedLoan: PropTypes.func.isRequired
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
            <a href="#" onClick={this.handleClickListItem.bind(this)} data-toggle="modal" data-target="#loandetailmodal">{this.props.loan.clientName()} - &#x20b1;{this.props.loan.amountFinanced}</a>
            &nbsp;{label}
          </h4>
        </div>
        <span className="list-group-item-text">{this.props.loan.agentName()}</span>
      </li>
    );
  }
}
