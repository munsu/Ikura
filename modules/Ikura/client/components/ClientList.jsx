import { Component, PropTypes } from 'react';
import ClientEntry from './ClientEntry';
import ClientModal from './ClientModal';


export default class ClientList extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
    clients: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        <div className="list-group">
          {this.props.clients.map(client =>
            <ClientEntry
              hideCompleted={this.props.hideCompleted}
              key={client._id}
              client={client} />)}
        </div>

        <div>
          {this.props.clients.map(client =>
            <ClientModal
              key={client._id}
              client={client} />)}
        </div>
      </div>
    );
  }
}
