import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Loans } from '../api/loans.js';

import AdminModal from './components/AdminModal';
import Header from './components/Header';
import LoanList from './components/LoanList';
import LoanEnrollmentModal from './components/LoanEnrollmentModal';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      agentFilter: Meteor.user() ? Meteor.user().username : 'None'
    };
  }

  componentDidMount() {
    Accounts.onLogin(e => this.setState({
      agentFilter: Meteor.user() ? Meteor.user().username : 'None'
    }));

    let _logout = Meteor.logout;
    Meteor.logout = e => {
      this.setState({agentFilter: 'None'});
      _logout.apply(Meteor, null);
    }

  }

  handleToggleHideCompleted(e) {
    this.setState({ hideCompleted: !this.state.hideCompleted });
    e.target.blur();
  }

  handleFilterByAgent(e) {
    console.log(this)
    this.setState({ agentFilter: e.target.text });
  }

  renderLoans() {
    let filteredLoans = this.props.loans;
    console.log(filteredLoans)
    if (this.state.hideCompleted) {
      filteredLoans = filteredLoans.filter(loan => !loan.isDone);
    }
    if (this.state.agentFilter != 'None') {
      const agent = Meteor.users.find({username: this.state.agentFilter}).fetch()[0];
      filteredLoans = filteredLoans.filter(loan => loan.agentId == agent._id);
    }
    console.log(filteredLoans)
    return (
      <LoanList
        loans={filteredLoans} />
    )
  }

  render() {
    if (!this.props.loans) {
      // loading
      return null;
    }

    return (
        <div className="container">
          <Header
              hideCompleted={this.state.hideCompleted}
              toggleHideCompleted={this.handleToggleHideCompleted.bind(this)}
              agentFilter={this.state.agentFilter}
              filterByAgent={this.handleFilterByAgent.bind(this)} />

          <AdminModal />

          <LoanEnrollmentModal
              agents={this.props.agents} />

          <div className="page-container col-md-8 col-md-offset-2">
            {this.renderLoans()}
          </div>
        </div>
    );
  }
}

App.propTypes = {
  agents: PropTypes.array.isRequired,
  loans: PropTypes.array.isRequired,
  user: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('loans');
  Meteor.subscribe('userData');

  return {
    agents: Meteor.users.find().fetch(),
    loans: Loans.find().fetch(),
    user: Meteor.user()
  };
}, App);
