import { Component, PropTypes } from 'react';
import LoanListItem from './LoanListItem';
import LoanDetailModal from './LoanDetailModal2';


export default class LoanList extends Component {
  static propTypes = {
    loans: PropTypes.array.isRequired,
    setSelectedLoan: PropTypes.func.isRequired,
    selectedLoan: PropTypes.any.isRequired
  }

  render() {
    return (
      <div className="page-container col-md-8 col-md-offset-2">
        <ul className="list-group">
          {this.props.loans.map(loan =>
            <LoanListItem
              key={loan._id}
              loan={loan}
              setSelectedLoan={this.props.setSelectedLoan} />)}
        </ul>

        <div>
          {this.props.loans.map(loan =>
            <LoanDetailModal
              key={loan._id}
              loan={loan} />)}
        </div>

      </div>
    );
  }
}
