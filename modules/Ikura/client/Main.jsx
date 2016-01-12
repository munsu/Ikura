import { Component } from 'react';
import ReactMixin from 'react-mixin';

import AdminModal from './components/AdminModal';
import Header from './components/Header';
import LoanList from './components/LoanList';
import LoanEnrollmentModal from './components/LoanEnrollmentModal';

import Loans from 'Ikura/collections/Loans';

@ReactMixin.decorate(ReactMeteorData)
export default class Main extends Component {

  state = {
    hideCompleted: false,
    agentFilter: Meteor.user() ? Meteor.user().username : 'None'
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

  getMeteorData() {
    Meteor.subscribe('loans');
    Meteor.subscribe('userData');

    let loanFilter = {};
    let loans = [];

    if (this.state.hideCompleted) {
      loanFilter.isDone = {$ne: true};
    }

    if (this.state.agentFilter != 'None') {
      const agent = Meteor.users.find({username: this.state.agentFilter}).fetch()[0];
      loanFilter.agentId = agent._id;
      loans = Loans.find(loanFilter, {sort: {name: 1}}).fetch();
    }

    return {
      agents: Meteor.users.find().fetch(),
      loans: loans,
      user: Meteor.user()
    };
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: !this.state.hideCompleted });
    e.target.blur();
  }

  handleFilterByAgent = (e) => {
    this.setState({ agentFilter: e.target.text });
  }

  render() {
    if (!this.data.loans) {
      // loading
      return null;
    }

    return (
        <div className="container">
          <Header
              hideCompleted={this.state.hideCompleted}
              toggleHideCompleted={this.handleToggleHideCompleted}
              agentFilter={this.state.agentFilter}
              filterByAgent={this.handleFilterByAgent} />

          <AdminModal />

          <LoanEnrollmentModal
              agents={this.data.agents} />

          <div className="page-container col-md-8 col-md-offset-2">
            <LoanList
                loans={this.data.loans} />
          </div>
        </div>
    );
  }
};
