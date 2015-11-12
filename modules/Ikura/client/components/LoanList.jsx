import { Component, PropTypes } from 'react';
import LoanListEntry from './LoanListEntry';
import LoanDetailModal from './LoanDetailModal';


export default class LoanList extends Component {
  static propTypes = {
    loans: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        <div className="list-group">
          {this.props.loans.map(loan =>
            <LoanListEntry
              key={loan._id}
              loan={loan} />)}
        </div>

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
