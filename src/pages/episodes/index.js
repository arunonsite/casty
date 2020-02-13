import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';



import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

class EpisodePage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      newDepartment : {   enumber: '',
      ename : '',
      edesc : '',
      ephoto : ''},
      episodes :[{
        enumber: '1234',
        ename: 'Sun',
        edesc : 'Test channel',
        ephoto : 'test.mp4'
      },
      {
        enumber: '1234',
        ename: 'Sun',
        edesc : 'Test channel',
        ephoto : 'test.mp4'
      }],

        userModal :{
        show: false,
        title: 'New Episode',
        mode : 'Add',
        data:   {
          enumber: '',
        ename: '',
        edesc : '',
        ephoto : ''
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
    return this.state.episodes.map((depart, index) => {
       const {  enumber,ename, edesc, ephoto } = depart //destructuring
       return (
          <tr key={enumber}>          
             <td>{Math.random(1)}</td>
             <td>{enumber}</td>
             <td>{ename}</td>
             <td>{edesc}</td>
             <td>{ephoto}</td>
             <td><button type="button" class="btn btn-primary btn-sm">View</button> <button type="button" onClick={() => { this.toggleEditUserModal(depart) }}  class="btn btn-warning btn-sm">Edit</button>  <button type="button" class="btn btn-danger btn-sm">Delete</button> </td>
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
  const {episodes =[], newDepartment={}} = this.state;
  episodes.push(newDepartment);  
  this.setState({episodes: episodes,newDepartment : {  enumber:'', ename: '',
  edesc : '',
  ephoto : ''} });
}
toggleNewUserModal = () => {
  const {userModal : {show = false}} = this.state;   
  this.setState({ userModal: {
    show: !show,
    title: 'New Episode',
    mode : 'add',
    data:   {
      enumber: '',
      ename: '',
      edesc: '',
      ephoto: ''
    },
  }}
  );
}
toggleEditUserModal = (user) => {
  const {userModal : {show = false}} = this.state;   
  this.setState({ 
    userModal: {      show: !show,      title: 'Edit Episode',      mode : 'edit' ,
    data:   {...user},   
  },
    
  }
  );
}
  render() {
    //const {newDepartment:{enumber='', ename='', edesc='', ephoto=''}} = this.state;
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
                  <h1>Episodes List</h1>
                  <Button style={{ float: "right" }} variant="primary" onClick={this.toggleNewUserModal}>
                    + New User        </Button>
                  <Table striped bordered hover>
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Episodes Number</th>
                    <th>Episodes Name</th>
                    <th>Episodes Description</th>
                    <th>Photo</th>
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


export default connect()(EpisodePage);