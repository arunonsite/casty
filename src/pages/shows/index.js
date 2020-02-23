import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';
import  * as showActions from '../../redux/show/actions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import MaterialTable from "material-table";
import { notifyMe } from '../../helpers/applicationUtils';
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
          cphoto : '',
          channelId:'',
          channelName:'',}
        },
       
    };
  }

  componentDidUpdate(){ 
    const {showNotification ={}, showNotification :{notify = false}} = this.props; 
    
    notifyMe(showNotification);   
    
    
  }


  componentDidMount(){
    const {user:{id=''}} = this.props;
    this.props.actions.loadChannelsByUser(id);
    this.loadPageData();    
  }
 

 loadPageData = () => {  //this.state.departments.push()
  const {user:{id=''}} = this.props;
  this.props.actions.loadShows(id);
 }
 handleChange =  (event, field) => {   
  const {newShowModalData :{formData={}}} = this.state;
  formData[event.target.name] = event.target.value;  

   this.setState({newShowModalData: {formData : formData}});
 // this.setState({newShowModalData: {formData : formData}});
 }
 handleSubmit =() => {   
  const {user:{id=''}} = this.props;
  const { newShowModalData:{formData={}}} = this.state; 
  const newCHannelData= Object.assign({...formData}, {userId : id}); 
  this.props.actions.newShow(newCHannelData);
 }     
 toggleShowModal = () => {

   const {showModal : {show = false}, pageDropDown:{channelsByUser=[]}} = this.props; 

   const { newShowModalData:{formData={}}} = this.state;
   
   const togg = { showModal: {
     show: !show,
     title: 'New Show',
     mode : 'add',
     buttonText : 'Add Show',
     formData:   {
       name :'',
       description:'', 
       channelId:'',
       channelName:'',

     },
     channelsByUser
   }};  
   this.setState({newShowModalData: {
     formData : { 
       name :'',
       description:'', 
       channelId:'',
       channelName:'',
   },
   channelsByUser}});  
   this.props.actions.onclickModal(togg);
  }
 toggleEditChannelModal = (channel) => { 
    const {channelModal : {show = false}} = this.props; 
     const {name = "Demo1",    description= "Demo 2", id=''} = channel;
     const togg = { channelModal: {
       show: !show,
       title: 'Edit Channel',
       mode : 'edit',
       buttonText: 'Update Channel',
       formData:   {
        name,
       description, 
       id
       },
     }}; 
     /* to save in loacal State */
     this.setState({newShowModalData: {
       formData : { 
       name,
       description,
       id
     },}});     
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
        
          {...showModal}
          {...newShowModalData}
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
            { title: "Channel", field: "channel.name" 
              },
           
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
                      fontSize: 50,
                      textAlign: 'center',
                      color: 'white',
                      backgroundColor: '#6c757d',
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
              icon: 'add_circle',
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
  const {Auth:{user={}}, ShowPageReducer : {showNotification,shows=[], loading=false, showModal={}, channelsByUser} }= state;

  shows.map((show, ind)=>{
   let selectChan = channelsByUser.filter((channel) =>
    channel.id == show.channelId)
     show[`channel`] =selectChan[0];
  });
  return {  user , shows,loading, showModal,showNotification, pageDropDown:{channelsByUser} };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);