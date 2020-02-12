import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table, Button } from 'react-bootstrap';



import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';


class DefaultDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
     
      users: [{
        lname: 'Scot',
        fname: 'mark',
        username: 'Scot',
        password: '12345',
        cpassword: '12345',
        email: 'scot@gmail.com',
        cemail: 'scot@gmail.com',
        phone: '563434232'
      },
      {
        lname: 'Kelsey',
        fname: 'mark',
        username: 'kelsey',
        password: '12345',
        cpassword: '12345',
        email: 'kelsey@gmail.com',
        cemail: 'kelsey@gmail.com',
        phone: '563434232'
      }],




      userModal :{
        show: false,
        title: 'New User',
        mode : 'Add',
        data:   {
          fname: '',
          lname: '',
          username: '',
          password: '',
          cpassword: '',
          email: '',
          cemail: '',
           phone: ''
        },
      }
    };
  }

  renderTableData() {
    return this.state.users.map((user, index) => {
      const { lname, fname, username, email, phone } = user //destructuring
      return (
        <tr key={username}>

          <td>{lname}</td>
          <td>{fname}</td>
          <td>{username}</td>

          <td>{email}</td>

          <td>{phone}</td>
          <td>
            <button type="button"    class="btn btn-primary btn-sm">View</button>
           <button type="button" onClick={() => { this.toggleEditUserModal(user) }} class="btn btn-warning btn-sm">Edit</button> 
            <button type="button" class="btn btn-danger btn-sm">Delete</button> </td>
        </tr>
      )
    })
  }
  saveNew = () => {  //this.state.departments.push()
    return false;
  }
  handleChange = (event, field) => {
    const { newUser = {} } = this.state;
    newUser[event.target.name] = event.target.value;
    this.setState({ newUser: { ...newUser } });
  }
  handleSubmit = (event) => {
    const { users = [], newUser = {} } = this.state;
    users.push(newUser);
    this.setState({
      users: users, newUser: {
        fname: '', lname: '',
        username: '',
        password: '', cpassword: '', email: '', cemail: '', phone: ''
      }
    });
  }

  toggleNewUserModal = () => {
    const {userModal : {show = false}} = this.state;   
    this.setState({ userModal: {
      show: !show,
      title: 'New User',
      mode : 'add',
      data:   {
        fname: '',
        lname: '',
        username: '',
        password: '',
        cpassword: '',
        email: '',
        cemail: '',
         phone: ''
      },
    }}
    );
  }
  toggleEditUserModal = (user) => {
    const {userModal : {show = false}} = this.state;   
    this.setState({ 
      userModal: {      show: !show,      title: 'Edit User',      mode : 'edit' ,
      data:   {...user},   
    },
      
    }
    );
  }
  

  render() {
    const { newUser = {}, addNewUser = false, modalTitle,userModal={} } = this.state;
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
                  <h1>Episodes List</h1>
                  <Button style={{ float: "right" }} variant="primary" onClick={this.toggleNewUserModal}>
                    + New User        </Button>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
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