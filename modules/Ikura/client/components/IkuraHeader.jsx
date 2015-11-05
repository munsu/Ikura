import { Component, PropTypes } from 'react';

const LoginButtons = BlazeToReact('loginButtons');

export default class IkuraHeader extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
    toggleHideCompleted: PropTypes.func.isRequired
  }

  // handleSubmit(event) {
  //   // Prevent default browser form submit
  //   event.preventDefault();

  //   // Get value from form element
  //   var text = event.target.text.value;

  //   // Insert a task into the collection
  //   Meteor.call('addLoan', text);

  //   // Clear form
  //   event.target.text.value = '';
  // }

  render() {
    let form = null;

    // if (Meteor.userId()) {
    //   form = (
    //     <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
    //       <input type="text" name="text" placeholder="Type to add new tasks" />
    //     </form>
    //   );
    // }

    return (
      <header>
        <div className="row">
          <div className="col-md-2 col-md-offset-5">
            <h1 className="text-center">
              Ikura
            </h1>
          </div>
          <div className="col-md-1 col-md-offset-4">
            <LoginButtons align="right" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 col-md-offset-4 input-group">
            <span className="input-group-addon">
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            </span>
            <input type="text" className="form-control" />
          </div>
        </div>

        <label className="hide-completed">
          <input type="checkbox" checked={this.props.hideCompleted} onChange={this.props.toggleHideCompleted} />
          Hide Completed Loans
        </label> <br />


      </header>
    );
  }
}
