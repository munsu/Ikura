import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AdminModal extends Component {

  handleSubmit(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Form values
    const agentName = event.target.agentName.value;

    // new client
    Meteor.call('addAgent', agentName);

    // Reset form
    event.target.reset();
    $("#adminmodal").modal('hide');
  }

  render() {
    return (
      <div className="modal" id="adminmodal" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Admin Panel</h4>
            </div>

            <div className="modal-body">
              <form className="form-horizontal" id="newAgentForm" onSubmit={this.handleSubmit.bind(this)}>
                {/* Agents */}
                <div className="form-group">
                  <label htmlFor="input-agent-username" className="col-sm-4 control-label">New Agent</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="input-agent-username" name="agentName" />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" form="newAgentForm" value="submit">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}