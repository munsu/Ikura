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
      <div className="dropdown">
        <button type="button" className="btn btn-default btn-block dropdown-toggle" id="sortAgentDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.props.agentFilter} <span className="glyphicon glyphicon-filter" aria-hidden="true"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="sortAgentDropdown">
          <li><a href="#" onClick={this.props.filterByAgent}>All</a></li>
          <li role="separator" className="divider"></li>
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