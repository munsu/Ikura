import React, { Component, PropTypes } from 'react';

export default class Accounts extends Component {
  handleLogin(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Form values
    const username = event.target.username.value;
    const password = event.target.password.value;

    // new client
    Meteor.loginWithPassword(username, password);

    // Reset form
    event.target.reset();
  }

  render() {
    return (
      <form id="login-form" action="action" onSubmit={this.handleLogin.bind(this)}>
        <div>
          <input type="username" name="username" id="login-username" />
          <input type="password" name="password" id="login-password" />
          <input type="submit" id="login-button" value="Sign in" />
       </div>
     </form> 
    );
  }
}
