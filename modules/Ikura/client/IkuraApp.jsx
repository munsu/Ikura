import { Component, PropTypes } from 'react';

export default class IkuraApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  componentWillMount() {
    require('./css/Ikura.import.css');
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
