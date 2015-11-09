import { Component, PropTypes } from 'react';
import LoanEntry from './LoanEntry';
import LoanModal from './LoanModal';


export default class LoanList extends Component {
  static propTypes = {
    loans: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        <div className="list-group">
          {this.props.loans.map(loan =>
            <LoanEntry
              key={loan._id}
              loan={loan} />)}
        </div>

        <div>
          {this.props.loans.map(loan =>
            <LoanModal
              key={loan._id}
              loan={loan} />)}
        </div>
      </div>
    );
  }
}
