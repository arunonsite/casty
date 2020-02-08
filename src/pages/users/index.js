import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';



import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';


class DefaultDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      newDepartment : {   fname: '',
      lname : '',
      username : '',
      password : '',
      cpassword : '',
      email : '',
      cemail : '',phone : ''},
      users :[{
        lname: 'Scot',
        fname: 'mark',
        username : 'Scot',
        password : '12345',
        cpassword : '12345',
        email : 'scot@gmail.com',
        cemail : 'scot@gmail.com',
        phone : '563434232'
      },
      {
        lname: 'Kelsey',
        fname: 'mark',
        username : 'kelsey',
        password : '12345',
        cpassword : '12345',
        email : 'kelsey@gmail.com',
        cemail : 'kelsey@gmail.com',
        phone : '563434232'
      }],
      addNewForm : false
    };
  }

  renderTableData() {
    return this.state.users.map((depart, index) => {
       const { lname,fname, username, password, cpassword, email, cemail, phone } = depart //destructuring
       return (
          <tr key={username}>          
            
             <td>{lname}</td>
             <td>{fname}</td>
             <td>{username}</td>
             <td>{password}</td>
             <td>{cpassword}</td>
             <td>{email}</td>
             <td>{cemail}</td>
             <td>{phone}</td>
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
  const {users =[], newDepartment={}} = this.state;
  users.push(newDepartment);  
  this.setState({users: users,newDepartment : {  fname:'', lname: '',
  username : '',
  password : '',cpassword : '',email : '',cemail : '',phone : ''} });
}
toggleAdd = (event) =>{
  console.log('this is:', this);
  if(!this.state.addNewForm){
    this.setState ({addNewForm: true});
  }
}
  render() {
    const {newDepartment:{fname='', lname='', username='', password='', cpassword='',email='',cemail='', phone=''}} = this.state;
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
                              <span class="d-none d-sm-inline" style={{color:'#FFF'}}>New User</span>
                            </a>
                          </li>

                        </ul>
                        <div class="tab-content mb-0 b-0">
                          <div class="tab-pane active" id="first">

                            <div class="tab-pane" id="first">
                            <form onSubmit={this.handleSubmit}>
                                <div class="row">
                                  <div class="col-12">
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="userName3">First Name</label>
                                      <div class="col-md-9">
                                        <input type="text"  value={fname} onChange={this.handleChange} class="form-control" id="userName3" name="name" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="userName3">Last Name</label>
                                      <div class="col-md-9">
                                        <input type="text"  value={lname} onChange={this.handleChange} class="form-control" id="userName3" name="name" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Username</label>
                                      <div class="col-md-9">
                                        <input type="text" value={username} onChange={this.handleChange} id="password3" name="username" class="form-control" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Password</label>
                                      <div class="col-md-9">
                                        <input type="password" value={password} onChange={this.handleChange} id="password3" name="password" class="form-control" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Confirm Password</label>
                                      <div class="col-md-9">
                                        <input type="password" value={cpassword} onChange={this.handleChange} id="cpassword3" name="cpassword" class="form-control" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Email</label>
                                      <div class="col-md-9">
                                        <input type="text" value={email} onChange={this.handleChange} id="email" name="email" class="form-control" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Confirm Email</label>
                                      <div class="col-md-9">
                                        <input type="text" value={cemail} onChange={this.handleChange} id="cemail" name="cemail" class="form-control" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Phone</label>
                                      <div class="col-md-9">
                                        <input type="password" value={phone} onChange={this.handleChange} id="phone" name="phone" class="form-control" required />
                                      </div>
                                    </div>

  
                                  </div>
                                </div>
                                <ul class="list-inline wizard mb-0">

                         

                          <input type="submit" value="Save New" class="btn btn-secondary button-next float-right"/>

                        
                          </ul>
                              </form>
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
                  <h1>Episodes List</h1>
                  <div style={{float: "right"}}><button type="button" class="btn btn-primary btn-sm">Add</button></div>
                  <Table striped bordered hover>
                    <thead>
                    <tr>
                    
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Confirm password</th>
                    <th>Email</th>
                    <th>Confirm email</th>
                    <th>Phone</th>
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