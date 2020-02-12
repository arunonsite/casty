import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';



import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';


class DefaultShows extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      newDepartment : {   sname: '',
      sdesc : '',
      sphoto : ''},
      shows :[{
        sname: 'Sun',
        sdesc : 'Test channel',
        sphoto : 'test.mp4'
      },
      {
        sname: 'Vijay',
        sdesc : 'Test channel',
        sphoto : 'test.mp4'
      }],

        userModal :{
        show: false,
        title: 'New Shows',
        mode : 'Add',
        data:   {
          sname: '',
          sdesc: '',
          sphoto: ''
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
    return this.state.shows.map((shows, index) => {
       const {  sname, sdesc, sphoto } = shows //destructuring
       return (
          <tr key={sname}>          
             <td>{Math.random(1)}</td>
             <td>{sname}</td>
             <td>{sdesc}</td>
             <td>{sphoto}</td>
             <td><button type="button" class="btn btn-primary btn-sm">View</button> 
             <button type="button" onClick={() => { this.toggleEditShowModal(shows) }} class="btn btn-warning btn-sm">Edit</button>  
             <button type="button" class="btn btn-danger btn-sm">Delete</button> </td>
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
  const {shows =[], newDepartment={}} = this.state;
  shows.push(newDepartment);  
  this.setState({shows: shows,newDepartment : {  sname: '',
  sdesc : '',
  sphoto : ''} });
}
toggleNewShowModal = () => {
  const {userModal : {show = false}} = this.state;   
  this.setState({ userModal: {
    show: !show,
    title: 'New Shows',
    mode : 'add',
    data:   {
      sname: '',
      sdesc: '',
      sphoto: ''
    },
  }}
  );
}
toggleEditShowModal = (shows) => {
  const {userModal : {show = false}} = this.state;   
  this.setState({ 
    userModal: {      show: !show,      title: 'Edit Shows',      mode : 'edit' ,
    data:   {...shows},   
  },
    
  }
  );
}

  render() {
    //const {newDepartment:{sname='', sdesc='', sphoto=''}} = this.state;
    const { newDepartment = {}, addNewUser = false, modalTitle,userModal={} } = this.state;
    return (
      <React.Fragment>
        <Modal
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}          
          handlehide={this.toggleNewShowModal}         
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
                  <h1>Shows List</h1>
                  <Button style={{ float: "right" }} variant="primary" onClick={this.toggleNewShowModal}>
                    + New User        </Button>
                  <Table striped bordered hover>
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Show Name</th>
                    <th>Show Description</th>
                    <th>Show Photo/Video</th>
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


export default connect()(DefaultShows);