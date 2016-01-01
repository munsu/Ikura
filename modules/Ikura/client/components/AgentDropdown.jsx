import { Component, PropTypes } from 'react';

import AgentDropdownItem from './AgentDropdownItem';

export default class AgentDropdown extends Component {
  static propTypes = {
    agents: PropTypes.array.isRequired,
    agentFilter: PropTypes.string,
    filterByAgent: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className="dropdown navbar-btn">
        <button type="button" className="btn btn-link dropdown-toggle" id="sortAgentDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="glyphicon glyphicon-filter" aria-hidden="true"></span> {this.props.agentFilter}
        </button>
        <ul className="dropdown-menu" aria-labelledby="sortAgentDropdown">
          {this.props.agents.map(agent =>
            <AgentDropdownItem
              key={agent._id}
              agent={agent}
              filterByAgent={this.props.filterByAgent} />)}
        </ul>
      </div>
    )
  }
  
}