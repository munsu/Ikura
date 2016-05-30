import React, { Component, PropTypes } from 'react';

import AgentDropdownItem from './AgentDropdownItem';

export default class AgentDropdown extends Component {
  render() {
    return (
      <div className="dropdown navbar-btn">
        <button type="button" className="btn btn-link dropdown-toggle" id="sortAgentDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="glyphicon glyphicon-filter" aria-hidden="true"></span> {this.props.agentFilter}
        </button>
        {this._agentDropdownItems()}
      </div>
    )
  }

  _agentDropdownItems() {
    if (this.props.agents.length > 0) {
      return (
        <ul className="dropdown-menu" aria-labelledby="sortAgentDropdown">
          {this.props.agents.map(agent =>
            <AgentDropdownItem
              key={agent._id}
              agent={agent}
              filterByAgent={this.props.filterByAgent} />)}
        </ul> 
      )
    }
  }
}

AgentDropdown.propTypes = {
    agents: PropTypes.array.isRequired,
    agentFilter: PropTypes.string,
    filterByAgent: PropTypes.func.isRequired
}