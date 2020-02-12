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
      newDepartment : {   name: '',
      email : '',
      number : ''},
      departments :[{
        
        name: 'mark',
        email : 'mark@gmail.com',
        number : '87987654654'
      },
      {
        name: 'Jacob',
        email : 'Jacob@gmail.com',
        number : '654321987'
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
    return this.state.departments.map((depart, index) => {
       const {  name, number, email } = depart //destructuring
       return (
          <tr key={email}>          
             <td>{Math.random(1)}</td>
             <td>{name}</td>
             <td>{email}</td>
             <td>{number}</td>
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
  const {departments =[], newDepartment={}} = this.state;
  departments.push(newDepartment);  
  this.setState({departments: departments,newDepartment : {   name: '',
  email : '',
  number : ''} });
}
toggleAdd = (event) =>{
  console.log('this is:', this);
  if(!this.state.addNewForm){
    this.setState ({addNewForm: true});
  }
}
  render() {
    const {newDepartment:{name='', email='', number=''}} = this.state;
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
                              <span class="d-none d-sm-inline">New Department</span>
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
                                      <label class="col-md-3 col-form-label" for="userName3">Departemnt Name</label>
                                      <div class="col-md-9">
                                        
                                        <AvField type="text"  value={name} onChange={this.handleChange} class="form-control" id="department_name" name="department_name" errorMessage="Invalid Department name" validate={{
                                     required: {value: true}
                                 
                                     }} />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Email</label>
                                      <div class="col-md-9">
                                       
                                        <AvField type="text"  value={email} onChange={this.handleChange} class="form-control" id="department_email" name="department_email" errorMessage="Invalid Email" validate={{
                                     required: {value: true}
                                 
                                     }} />
                                      </div>
                                    </div>

                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="confirm3">Contact No</label>
                                      <div class="col-md-9">
                                        
                                        <AvField type="text"  value={number} onChange={this.handleChange} class="form-control" id="department_number" name="department_number" errorMessage="Invalid Number" validate={{
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
                  <h1>Department List</h1>
                  <div style={{float: "right"}}><button type="button" class="btn btn-primary btn-sm">Add</button></div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Department Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
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