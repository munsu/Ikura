import { Component } from 'react';
import ReactMixin from 'react-mixin';

import AdminModal from './components/AdminModal';
import ClientEnrollmentModal from './components/ClientEnrollmentModal';
import Header from './components/Header';
import LoanList from './components/LoanList';
import LoanEnrollmentModal from './components/LoanEnrollmentModal';

import Clients from 'Ikura/collections/Clients';
import Loans from 'Ikura/collections/Loans';

@ReactMixin.decorate(ReactMeteorData)
export default class Main extends Component {

  state = {
    hideCompleted: false,
    agentFilter: 'All',
    selectedLoan: null,
  }

  getMeteorData() {
    Meteor.subscribe('loans');
    Meteor.subscribe('clients');
    Meteor.subscribe('userData');

    let loanFilter = {};

    if (this.state.hideCompleted) {
      loanFilter.isDone = {$ne: true};
    }

    if (this.state.agentFilter != 'All') {
      const agent = Meteor.users.find({username: this.state.agentFilter}).fetch()[0];
      const clients = Clients.find({agentId: agent._id}).fetch();
      loanFilter.clientId = {$in: clients.map(c => c._id)}
    }
    const loans = Loans.find(loanFilter, {sort: {createdAt: -1}}).fetch();

    return {
      loans: loans,
      clients: Clients.find().fetch(),
      user: Meteor.user()
    };
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: e.target.classList.contains("active") });
    e.target.blur();
  }

  handleFilterByAgent = (e) => {
    this.setState({ agentFilter: e.target.text });
  }

  handleSetSelectedLoan = (e) => {
    this.setState({ selectedLoan: e });
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

          <ClientEnrollmentModal />

          <LoanEnrollmentModal
              clients={this.data.clients} />

          <LoanList
              loans={this.data.loans}
              setSelectedLoan={this.handleSetSelectedLoan}
              selectedLoan={this.state.selectedLoan} />
        </div>
    );
  }
};
