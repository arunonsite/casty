import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';
import  * as episodeActions from '../../redux/episode/actions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import MaterialTable from "material-table";

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

class EpisodePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),  
      newEpisodeModalData :{
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
    const {episodeNotification : {notify = false, message='Success'}} = this.props; 
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
    }
  }

 loadPageData = () => {  //this.state.departments.push()
  const {user:{id=''}} = this.props;
  this.props.actions.loadEpisodes(id);
 }
 handleChange =  (event, field) => {   
  const {newEpisodeModalData :{formData={}}} = this.state;
  formData[event.target.name] = event.target.value;  
  this.setState({newEpisodeModalData: {formData : formData}});
 }
 handleSubmit =() => {

   
  const {user:{id=''}} = this.props;
  const { newEpisodeModalData:{formData={}}} = this.state; 
  const newCHannelData= Object.assign({...formData}, {userId : id}); 
  this.props.actions.newEpisode(newCHannelData);
 }    
toggleEpisodeModal = () => {
  const {episodeModal : {episode = false}} = this.props; 
  const togg = { episodeModal: {
    episode: !episode,
    title: 'New Episode',
    mode : 'add',
    data:   {
      name: '',
      description: '',
      cphoto: ''
    },
  }};  
  this.props.actions.onclickModal(togg);
 }
toggleEditEpisodeModal = () => {
  const {episodeModal : {episode = false}} = this.props; 
  const togg = { episodeModal: {
    episode: !episode,
    title: 'Edit Episode',
    mode : 'add',
    formData:   episode,
  }};  
  this.props.actions.onclickModal(togg);
/*   const {episodeModal : {episode = false}} = this.props; 
  const togg = { episodeModal: {
    episode: !episode,
    title: 'Edit Episode',
    mode : 'edit',
    data:   {
      name: '',
      description: '',
      cphoto: ''
    },
  }};  
  this.props.actions.onclickModal(togg); */
 }

  render() {
 
    //const {newEpisode:{name='', description='', cphoto=''}} = this.state;
    const {   addNewUser = false, modalTitle, newEpisodeModalData={} } = this.state;
     console.log("Currect Props", this.props.loading);



    const {episodes=[], episodeModal={}} = this.props;
    return (
      <React.Fragment>
        

        <Modal
          handleSubmit={this.handleSubmit}    
          handleChange={this.handleChange}          
          handlehide={this.toggleEpisodeModal}         
          size="l"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          {...newEpisodeModalData}
          {...episodeModal}
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
                  <Button style={{ float: "right" }} variant="primary" onClick={this.toggleEpisodeModal}>
                    + New User        </Button>
                    <MaterialTable
          columns={[
            { title: " Name", field: "name" },
            { title: " Description", field: "description" },
            { title: "Image", field: "birthYear", type: "imageFullURL",
            render: rowData => <img src={rowData.imageFullURL} style={{width: 50, borderRadius: '50%'}}/> },
           
          ]}
          data={episodes}
          title="Episodes"
          detailPanel={[
     
            {
              icon: 'play_circle_outline',
              tooltip: 'Episode Surname',
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
              onClick: (event) => this.toggleEpisodeModal()
            },
            {
              icon: 'edit',
              tooltip: 'edit Episode',
              onClick: (event, rowData) => this.toggleEditEpisodeModal(rowData)
            },
            rowData => ({
              icon: 'delete',
              tooltip: 'Delete Episode',
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
    actions: bindActionCreators(episodeActions, dispatch),
  };
}
const mapStateToProps = (state) => {
  const {Auth:{user={}} }= state;
  return {  user };
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodePage);