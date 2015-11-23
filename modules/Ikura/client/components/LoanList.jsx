import { Component, PropTypes } from 'react';
import LoanListItem from './LoanListItem';
import LoanDetailModal from './LoanDetailModal';


export default class LoanList extends Component {
  static propTypes = {
    loans: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.props.loans.map(loan =>
            <LoanListItem
              key={loan._id}
              loan={loan} />)}
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
