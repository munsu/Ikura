import React, { Component, PropTypes } from 'react';

export default class LoanListItem extends Component {

  render() {
    let modal_id = "#modal-" + this.props.loan._id
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
            <a href="#" data-toggle="modal" data-target={modal_id}>{this.props.loan.displayName()} - &#x20b1;{this.props.loan.amountFinanced}</a>
            &nbsp;{label}
          </h4>
        </div>
        <span className="list-group-item-text">{this.props.loan.agentName()}</span>
      </li>
    );
  }
}

LoanListItem.propTypes = {
    loan: PropTypes.object.isRequired,
}