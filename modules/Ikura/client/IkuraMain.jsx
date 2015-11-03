import { Component } from 'react';
import ReactMixin from 'react-mixin';

import IkuraHeader from './components/IkuraHeader';
import ClientList from './components/ClientList';

import Clients from 'Ikura/collections/Clients';

@ReactMixin.decorate(ReactMeteorData)
export default class IkuraMain extends Component {

  state = {
    hideCompleted: false
  }

  getMeteorData() {
    Meteor.subscribe('clients');

    return {
      clients: Clients.find({}).fetch(),
      clientsCount: Clients.find({}).count(),
      user: Meteor.user()
    };
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: e.target.checked });
  }

  render() {
    if (!this.data.clients) {
      // loading
      return null;
    }

    return (
        <div className="container">
          <div>count {this.data.clientsCount}</div>
          <IkuraHeader
              hideCompleted={this.state.hideCompleted}
              toggleHideCompleted={this.handleToggleHideCompleted} />

          <ClientList
              hideCompleted={this.state.hideCompleted}
              clients={this.data.clients} />
        </div>
    );
  }
};
