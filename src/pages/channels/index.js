import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';
import  * as channelActions from '../../redux/channel/actions';
import { bindActionCreators } from 'redux';


import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

class ChannelPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      newDepartment : {   cname: '',
      cdesc : '',
      cphoto : ''},
      channels :[],
      userModal :{
        show: false,
        title: 'New Channel',
        mode : 'Add',
        data:   {
          cname: '',
          cdesc: '',
          cphoto : ''
        },
      }
    };
  }
  componentDidMount(){
     const {user:{id=''}} = this.props;

    this.props.actions.loadChannel(id);
   }

  renderTableData() {
    return this.props.channels.map((channel, index) => {
       const {  name='', description='', imageFullURL='',id='' } = channel //destructuring
       return (
          <tr key={name}>          
             <td>{id}</td>
             <td>{name}</td>
             <td>{description}</td>
             <td align='center'><img src={imageFullURL} alt='channel' width="65" height="65" /> </td>
             <td><button type="button" class="btn btn-primary btn-sm">View</button> <button type="button" onClick={() => { this.toggleEditUserModal(channel) }} class="btn btn-warning btn-sm">Edit</button>  <button type="button" class="btn btn-danger btn-sm">Delete</button> </td>
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
toggleNewUserModal = () => {
  const {userModal : {show = false}} = this.state;   
  this.setState({ userModal: {
    show: !show,
    title: 'New Channel',
    mode : 'add',
    data:   {
      cname: '',
      cdesc: '',
      cphoto: ''
    },
  }}
  );
}
toggleEditUserModal = (user) => {
  const {userModal : {show = false}} = this.state;   
  this.setState({ 
    userModal: {      show: !show,      title: 'Edit Channel',      mode : 'edit' ,
    data:   {...user},   
  },
    
  }
  );
}

  render() {
    //const {newDepartment:{cname='', cdesc='', cphoto=''}} = this.state;
    const { newDepartment = {}, addNewUser = false, modalTitle,userModal={} } = this.state;
    const {channels=[]} = this.props;
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
                  <h1>Channels List</h1>
                  <Button style={{ float: "right" }} variant="primary" onClick={this.toggleNewUserModal}>
                    + New User        </Button>
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



function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(channelActions, dispatch),
  };
}
const mapStateToProps = (state) => {
   const {ChannelPageReducer: {channels=[]}, Auth:{user={}} }= state;

  return { channels , user};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);