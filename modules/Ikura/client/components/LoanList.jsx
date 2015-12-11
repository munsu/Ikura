import { Component, PropTypes } from 'react';
import LoanListItem from './LoanListItem';
import LoanDetailModal from './LoanDetailModal';


export default class LoanList extends Component {
  static propTypes = {
    loans: PropTypes.array.isRequired,
    setSelectedLoan: PropTypes.func.isRequired,
    selectedLoan: PropTypes.any
  }

  render() {
    return (
      <div className="col-md-8 col-md-offset-2">
        <ul className="list-group">
          {this.props.loans.map(loan =>
            <LoanListItem
              key={loan._id}
              loan={loan}
              setSelectedLoan={this.props.setSelectedLoan} />)}
        </ul>

        <LoanDetailModal loan={this.props.selectedLoan} />

      </div>
    );
  }
}
