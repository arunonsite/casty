import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';



import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';


class DefaultDashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      newDepartment : {   cname: '',
      cdesc : '',
      cphoto : ''},
      channels :[{
        cname: 'Sun',
        cdesc : 'Test channel',
        cphoto : 'test.mp4'
      },
      {
        cname: 'Vijay',
        cdesc : 'Test channel',
        cphoto : 'test.mp4'
      }],
      addNewForm : false
    };
  }

  componentDidMount() {
    this._isMounted = true;
}

componentWillUnmount() {
    this._isMounted = false;
}

  renderTableData() {
    return this.state.channels.map((depart, index) => {
       const {  cname, cdesc, cphoto } = depart //destructuring
       return (
          <tr key={cname}>          
             <td>{Math.random(1)}</td>
             <td>{cname}</td>
             <td>{cdesc}</td>
             <td>{cphoto}</td>
             <td><button type="button" class="btn btn-primary btn-sm">View</button> <button type="button" class="btn btn-warning btn-sm">Edit</button>  <button type="button" class="btn btn-danger btn-sm">Delete</button> </td>
          </tr>
       )
    })
 }
 saveNew = () => {  //this.state.departments.push()

return false;
 }
 handleChange =  (event, field) => {   
  const {newDepartment ={}} = this.state;
  newDepartment[event.target.name] = event.target.value;  
  this.setState({newDepartment: {...newDepartment}});
}
 handleSubmit =(event) => {
  event.preventDefault();
  const {channels =[], newDepartment={}} = this.state;
  channels.push(newDepartment);  
  this.setState({channels: channels,newDepartment : {  cname: '',
  cdesc : '',
  cphoto : ''} });
}
toggleAdd = (event) =>{
  console.log('this is:', this);
  if(!this.state.addNewForm){
    this.setState ({addNewForm: true});
  }
}
  render() {
    const {newDepartment:{cname='', cdesc='', cphoto=''}} = this.state;
    return (
      <React.Fragment>
        <div className="">
          { /* preloader */}
          {this.props.loading && <Loader />}
          <Row></Row>
          <Row class='hidden'>

            <Col lg={12}>
            <Row>
            <Col xl={12}>
              <div style={{ float: "right" }} onClick={this.toggleAdd(this.event)} >
               </div>
            </Col>
              </Row>
              { this.state.addNewForm ?
              <Row>
                <Col xl={12}>
                  <div class="card">
                    <div class="card-body">

                      <div id="rootwizard">
                        <ul class="nav nav-pills bg-secondary nav-justified form-wizard-header mb-3">
                          <li class="nav-item" data-target-form="#accountForm">
                            <a href="#first" data-toggle="tab" class="nav-link rounded-0 pt-2 pb-2">
                              <i class="mdi mdi-account-circle mr-1"></i>
                              <span class="d-none d-sm-inline" style={{color:'#FFF'}}>New Channel</span>
                            </a>
                          </li>

                        </ul>
                        <div class="tab-content mb-0 b-0">
                          <div class="tab-pane active" id="first">

                            <div class="tab-pane" id="first">
                            <AvForm>
                                <div class="row">
                                  <div class="col-12">
                                   
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="userName3">Channel Name</label>
                                      <div class="col-md-9">
                                      

                                        <AvField type="text"  value={cname} onChange={this.handleChange} class="form-control" id="channel_name" name="channel_name" errorMessage="Invalid channel name" validate={{
                                     required: {value: true}
                                 
                                     }} />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Channel Description</label>
                                      <div class="col-md-9">
                                      <AvField type="text"  value={cdesc} onChange={this.handleChange} class="form-control" id="channel_desc" name="channel_desc" errorMessage="Invalid channel Description" validate={{
                                     required: {value: true}
                                 
                                     }} />
                                       
                                      </div>
                                    </div>

                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="show">Photo</label>
                                      <div class="col-md-9 ">
                                     <AvField type="file" value={cphoto} onChange={this.handleChange} class="custom-file-input" id="cphoto" name="cphoto"  errorMessage="Invalid Photo" validate={{
                                     required: {value: true}
                                     }} />
                                     
                                      </div>
                                      
                                    </div>
                                  </div>
                                </div>
                                <ul class="list-inline wizard mb-0">

                         

                          <input type="submit" value="Save New" class="btn btn-secondary button-next float-right"/>

                        
                          </ul>
                          </AvForm>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
               : null }



            </Col>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h1>Channels List</h1>
                  <div style={{float: "right"}}><button type="button" class="btn btn-primary btn-sm">Add</button> </div>
                  <Table striped bordered hover>
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Channel Name</th>
                    <th>Channel Description</th>
                    <th>Photo/Video</th>
                    <th>Action</th>
                  </tr>
                    </thead>
                    <tbody>
                    {this.renderTableData()}

                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>


        </div>
      </React.Fragment>
    )
  }
}


export default connect()(DefaultDashboard);