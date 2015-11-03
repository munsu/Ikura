import { Component, PropTypes } from 'react';
import ClientEntry from './ClientEntry';

export default class ClientList extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
    clients: PropTypes.array.isRequired
  }

  render() {
    return (
      <ul>
        <li>{this.props.hideCompleted}</li>
        {this.props.clients.map(client =>
          <ClientEntry
            hideCompleted={this.props.hideCompleted}
            key={client._id}
            client={client} />)}
      </ul>
    );
  }
}