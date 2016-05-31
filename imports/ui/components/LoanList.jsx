import React, { Component, PropTypes } from 'react';
import LoanListItem from './LoanListItem';
import LoanDetailModal from './LoanDetailModal2';


export default class LoanList extends Component {

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.props.loans.map(loan =>
            <LoanListItem
              key={loan._id}
              loan={loan} />)}
        </ul>

          {this._loanList()}

      </div>
    );
  }

  _loanList() {
    if (this.props.loans.length > 0) {
      return (
        <div>
          {this.props.loans.map(loan =>
            <LoanDetailModal
              key={loan._id}
              loan={loan} />)}
        </div>
      )
    } else {
      return (
        <p>Nothing to display</p>
      )
    }
  }
}

LoanList.propTypes = {
    loans: PropTypes.array.isRequired,
}