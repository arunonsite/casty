import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';



import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

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
      
      userModal :{
        show: false,
        title: 'New Department',
        mode : 'Add',
        data:   {
          name: '',
          email: '',
          number : ''
        },
      }
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
toggleNewUserModal = () => {
  const {userModal : {show = false}} = this.state;   
  this.setState({ userModal: {
    show: !show,
    title: 'New Department',
    mode : 'add',
    data:   {
      name: '',
      email: '',
      number: ''
    },
  }}
  );
}
toggleEditUserModal = (user) => {
  const {userModal : {show = false}} = this.state;   
  this.setState({ 
    userModal: {      show: !show,      title: 'Edit Department',      mode : 'edit' ,
    data:   {...user},   
  },
    
  }
  );
}
  render() {
    //const {newDepartment:{name='', email='', number=''}} = this.state;
    const { newDepartment = {}, addNewUser = false, modalTitle,userModal={} } = this.state;
    return (
      <React.Fragment>
        <Modal
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}          
        handlehide={this.toggleNewUserModal}         
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        {...userModal}
      />
        <div className="">
          { /* preloader */}
          {this.props.loading && <Loader />}
          <Row></Row>
          <Row class='hidden'>
            <Col lg={12}>
              <Row>
                <Col xl={12}>
                  <div style={{ float: "right" }}   >
                  </div>
                </Col>
              </Row>
            </Col>

            <Col lg={12}>
              <Card>
                <CardBody>
                  <h1>Department List</h1>
                  <Button style={{ float: "right" }} variant="primary" onClick={this.toggleNewUserModal}>
                    + New User        </Button>
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