import { Component } from 'react';
import ReactMixin from 'react-mixin';

import IkuraHeader from './components/IkuraHeader';
import LoanList from './components/LoanList';

import Loans from 'Ikura/collections/Loans';

@ReactMixin.decorate(ReactMeteorData)
export default class IkuraMain extends Component {

  state = {
    hideCompleted: false
  }

  getMeteorData() {
    Meteor.subscribe('loans');
    Meteor.subscribe('clients');
    Meteor.subscribe('userData');

    let loanFilter = {};

    if (this.state.hideCompleted) {
      loanFilter.paid = {$ne: true};
    }

    const loans = Loans.find(loanFilter, {sort: {createdAt: -1}}).fetch();

    console.log(loans)
    return {
      loans: loans,
      user: Meteor.user()
    };
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: e.target.checked });
  }

  render() {
    if (!this.data.loans) {
      // loading
      return null;
    }

    return (
        <div className="container">
          <IkuraHeader
              hideCompleted={this.state.hideCompleted}
              toggleHideCompleted={this.handleToggleHideCompleted} />

          <LoanList
              loans={this.data.loans} />
        </div>
    );
  }
};
