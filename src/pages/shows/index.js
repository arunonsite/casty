import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';
import  * as showActions from '../../redux/show/actions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import MaterialTable from "material-table";

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

class ShowPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),  
      newShowModalData :{
        formData : 
         { name: '',
           description: '',
          cphoto : ''}
        },
       
    };
  }
  componentDidMount(){
    this.loadPageData();
  }
  componentDidUpdate(){
   /*  const {showNotification : {notify = false, message='Success'}} = this.props; 
    if(notify){
      toast.success(message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });
        this.loadPageData();
    } */
  }

 loadPageData = () => {  //this.state.departments.push()
  const {user:{id=''}} = this.props;
  this.props.actions.loadShows(id);
 }
 handleChange =  (event, field) => {   
  const {newShowModalData :{formData={}}} = this.state;
  formData[event.target.name] = event.target.value;  
  this.setState({newShowModalData: {formData : formData}});
 }
 handleSubmit =() => {   
  const {user:{id=''}} = this.props;
  const { newShowModalData:{formData={}}} = this.state; 
  const newCHannelData= Object.assign({...formData}, {userId : id}); 
  this.props.actions.newShow(newCHannelData);
 }    
toggleShowModal = () => {
  const {showModal : {show = false}} = this.props; 
  const togg = { showModal: {
    show: !show,
    title: 'New Show',
    mode : 'add',
    data:   {
      name: '',
      description: '',
      cphoto: ''
    },
  }};  
  this.props.actions.onclickModal(togg);
 }
toggleEditShowModal = () => {
  const {showModal : {show = false}} = this.props; 
  const togg = { showModal: {
    show: !show,
    title: 'Edit Show',
    mode : 'add',
    formData:   show,
  }};  
  this.props.actions.onclickModal(togg);
 }

  render() {
 
    //const {newShow:{name='', description='', cphoto=''}} = this.state;
    const {     newShowModalData={} } = this.state;
    const {shows=[], showModal={}} = this.props;
    return (
      <React.Fragment>
        

        <Modal
          handleSubmit={this.handleSubmit}    
          handleChange={this.handleChange}          
          handlehide={this.toggleShowModal}         
          size="l"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          {...newShowModalData}
          {...showModal}
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
                  <Button style={{ float: "right" }} variant="primary" onClick={this.toggleShowModal}>
                    + New User        </Button>
                    <MaterialTable
          columns={[
            { title: " Name", field: "name" },
            { title: " Description", field: "description" },
            { title: "Image", field: "birthYear", type: "imageFullURL",
            render: rowData => <img src={rowData.imageFullURL} style={{width: 50, borderRadius: '50%'}}/> },
           
          ]}
          data={shows}
          title="Shows"
          detailPanel={[
     
            {
              icon: 'local_movies',
              tooltip: 'Show Surname',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 100,
                      textAlign: 'center',
                      color: 'white',
                      backgroundColor: '#E53935',
                    }}
                  >
                    {rowData.name}
                  </div>
                )
              },
            }
          ]}
          actions={[
            {
              icon: 'add',
              tooltip: 'Add User',
              isFreeAction: true,
              onClick: (event) => this.toggleShowModal()
            },
            {
              icon: 'edit',
              tooltip: 'edit Show',
              onClick: (event, rowData) => this.toggleEditShowModal(rowData)
            },
            rowData => ({
              icon: 'delete',
              tooltip: 'Delete Show',
              onClick: (event, rowData) => alert("You saved " + rowData.name),
              disabled: rowData.birthYear < 2000
            })
          ]}
          options={{
            actionsColumnIndex: -1
          }}
        />
                
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
    actions: bindActionCreators(showActions, dispatch),
  };
}
const mapStateToProps = (state) => {
   console.log("state----", state);
  const {Auth:{user={}}, ShowPageReducer : {shows=[], loading=false} }= state;
  return {  user , shows,loading };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);