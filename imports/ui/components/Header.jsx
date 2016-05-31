import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import AgentDropdown from './AgentDropdown';

const LoginButtons = BlazeToReact('loginButtons');

export default class Header extends Component {

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
    let hideButtonClass = "btn btn-link navbar-btn navbar-right"
    if (this.props.hideCompleted)
      hideButtonClass += " active";

    return (
      <header>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <span className="navbar-icon">
                <i id="icon" className="fa fa-motorcycle" style={{textShadow: 'None', fontSize: '27px', color: 'rgb(248, 248, 248)', height: '30px', width: '30px', lineHeight: '30px', borderRadius: '20%', textAlign: 'center', backgroundColor: 'rgb(51, 122, 183)'}}></i>
              </span>
            </div>
            <button type="button" className="btn btn-primary navbar-btn" data-toggle="modal" data-target="#newloan">New</button>
            <AgentDropdown
              agents={Meteor.users.find().fetch()}
              agentFilter={this.props.agentFilter}
              filterByAgent={this.props.filterByAgent} />
            <div className="navbar-text navbar-right">
              <LoginButtons align="right" />
            </div>
            <button type="button" className="btn btn-link navbar-btn navbar-right" data-toggle="modal" data-target="#adminmodal">
              <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
            </button>
            <button type="button" className={hideButtonClass} data-toggle="button" autoComplete="off" aria-pressed={this.props.hideCompleted} onFocus={this.props.toggleHideCompleted}>Hide Completed</button>
          </div>
        </nav>

      </header>
    );
  }
}

Header.propTypes = {
    hideCompleted: PropTypes.bool,
    toggleHideCompleted: PropTypes.func.isRequired,
    agentFilter: PropTypes.string,
    filterByAgent: PropTypes.func.isRequired
}