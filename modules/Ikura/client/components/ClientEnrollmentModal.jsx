import { Component, PropTypes } from 'react';

export default class ClientEnrollmentModal extends Component {

  handleSubmit(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var firstName = event.target.firstName.value;
    var lastName = event.target.lastName.value;
    var selectAgent = event.target.selectAgent.value;
    Meteor.call('addClient', selectAgent, firstName, lastName);

    // Clear amount input
    event.target.firstName.value = '';
    event.target.lastName.value = '';
  }

  render() {
    return (
      <div className="modal" id="newclient" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">New Client</h4>
            </div>

            <div className="modal-body">
              <form className="form-horizontal" id="newClientForm" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label htmlFor="input-first-name" className="col-sm-4 control-label">First Name</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="input-first-name" name="firstName" placeholder="First Name" required />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-last-name" className="col-sm-4 control-label">Last Name</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="input-last-name" name="lastName" placeholder="Last Name" required />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="select-agent" className="col-sm-4 control-label">Agent</label>
                  <div className="col-sm-8">
                    <select className="form-control" id="select-agent" name="selectAgent">
                      {Meteor.users.find().fetch().map(user =>
                        <option key={user._id} value={user._id}>{user.username}</option>)}
                    </select>
                  </div> 
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" form="newClientForm" value="submit">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}