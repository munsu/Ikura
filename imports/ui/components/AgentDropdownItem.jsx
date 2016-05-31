import React, { Component, PropTypes } from 'react';

export default class AgentDropdownItem extends Component {
  render () {
    return (
      <li>
        <a href="#" onClick={this.props.filterByAgent}>{this.props.agent.username}</a>
      </li>
    )
  }

}

AgentDropdownItem.propTypes = {
    agent: PropTypes.object.isRequired,
    filterByAgent: PropTypes.func.isRequired
}