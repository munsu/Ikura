import { Component, PropTypes } from 'react';

export default class LoanEntry extends Component {
  static propTypes = {
    loan: PropTypes.object.isRequired
  }

  handleChecked(e) {
    // Set the checked property to the opposite of its current value
    Meteor.call('setDone', this.props.loan._id, e.target.checked);
  }

  // handleDelete() {
  //   Meteor.call('deleteTask', this.props.task._id);
  // }

  // handleSetPrivate() {
  //   Meteor.call('setPrivate', this.props.task._id, !this.props.task.private);
  // }

  // renderTogglePrivate() {
  //   if (Meteor.userId() !== this.props.task.owner) {
  //     return null;
  //   }

  //   return (
  //     <button className="toggle-private" onClick={this.handleSetPrivate.bind(this)}>
  //       {this.props.task.private ? 'Private' : 'Public'}
  //     </button>
  //   );
  // }

  render() {
    let itemClass = '';

    if (this.props.loan.done) {
      itemClass += 'checked';
    }

    return (
      <li className={itemClass}>
        <input type="checkbox" checked={this.props.loan.done} onChange={this.handleChecked.bind(this)} className="toggle-checked" />
        <span className="text">{this.props.loan.price}</span>
      </li>
    );
  }
}
