import { Component, PropTypes } from 'react';

export default class ClientEnrollmentModal extends Component {

  render() {
    return (
      <div className="modal" id="newclient" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">New Loan</h4>
            </div>

            <div className="modal-body">
              <form className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="input-first-name" className="col-sm-4 control-label">First Name</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="input-first-name" placeholder="First Name" />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="input-last-name" className="col-sm-4 control-label">Last Name</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="input-last-name" placeholder="Last Name" />
                  </div> 
                </div>
                <div className="form-group">
                  <label htmlFor="select-agent" className="col-sm-4 control-label">Agent</label>
                  <div className="col-sm-8">
                    <select className="form-control" id="select-agent">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div> 
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}