import { Component, PropTypes } from 'react';

export default class AgentDropdownItem extends Component {
  static propTypes = {
    agent: PropTypes.object.isRequired,
    filterByAgent: PropTypes.func.isRequired
  }

  render () {
    return (
      <li>
        <a href="#" onClick={this.props.filterByAgent}>{this.props.agent.username}</a>
      </li>
    )
  }
  
}