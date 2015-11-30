import { Component, PropTypes } from 'react';

import AgentDropdown from './AgentDropdown';

const LoginButtons = BlazeToReact('loginButtons');

export default class Header extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
    toggleHideCompleted: PropTypes.func.isRequired,
    agentFilter: PropTypes.string,
    filterByAgent: PropTypes.func.isRequired
  }

  // handleSubmit(event) {
  //   // Prevent default browser form submit
  //   event.preventDefault();

  //   // Get value from form element
  //   let text = event.target.text.value;

  //   // Insert a task into the collection
  //   Meteor.call('addLoan', text);

  //   // Clear form
  //   event.target.text.value = '';
  // }

  render() {
    let hideButtonClass = "btn btn-default btn-block"
    if (this.props.hideCompleted)
      hideButtonClass += " active";

    return (
      <header>
        <div className="row">
          <div className="col-md-2 col-md-offset-5">
            <h1 className="text-center">
              Ikura
            </h1>
          </div>
          <div className="col-md-1 col-md-offset-4">
            <LoginButtons align="right" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#newloan">New</button>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-addon">
                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
              </span>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-2">
            <button type="button" className={hideButtonClass} data-toggle="button" autoComplete="off" aria-pressed={this.props.hideCompleted} onFocus={this.props.toggleHideCompleted}>Hide Completed</button>
          </div>
          <div className="col-md-2">
            <AgentDropdown
              agents={Meteor.users.find().fetch()}
              agentFilter={this.props.agentFilter}
              filterByAgent={this.props.filterByAgent} />
          </div>
        </div>

        <br />

      </header>
    );
  }
}
