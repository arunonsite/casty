import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { toast } from 'react-toastify';
import swal from 'sweetalert'
import  * as showActions from '../../redux/show/actions';
import { bindActionCreators } from 'redux';
import MaterialTable from "material-table";
import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';
import { v4 as uuidv4 } from 'uuid';

const resetNotification  = {showNotification : {notify:false,mode:0,  message:''}};

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
     const {showNotification : {notify = false,mode=0, message='Success'}} = this.props; 
    if(notify){
      if(mode> -1){
        toast.success(message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
          });
          this.loadPageData();
      }else{
        toast.error(message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
          });
      }
     this.props.actions.resetShowNotification(resetNotification);
      // this.loadPageData();
    } 
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
/*   const {newShowModalData :{formData={}}} = this.state;
  formData[event.target.name] = event.target.value;  

   this.setState({newShowModalData: {formData : formData}}); */


   const { newShowModalData: { formData = {} } } = this.state;
   let proceddesData = {};
   proceddesData[event.target.name] = event.target.value;
   this.setState({ newShowModalData: { formData: { ...formData, ...proceddesData } } });


 // this.setState({newShowModalData: {formData : formData}});
 }
 handleFileChange = ({ id = "9dxverkvh", name = "postoffice (1).png", type = "image/png", data = '' }) => {
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(name)[1];

  const { newShowModalData: { formData = {} } } = this.state;

  const imageStruc = {
    previewFile: undefined, "ImageBase64": data,
    "ImageFileExtensionIncludingDot": '.' + ext
  };
  this.setState({ newShowModalData: { formData: { ...formData, ...imageStruc } } });
}
 handleSubmit =() => {   
  const {user:{id=''},showModal:{mode= "edit"}} = this.props;
  const { newShowModalData:{formData={}}} = this.state; 
  if(mode === 'edit'){
    const updateShowData = Object.assign({ ...formData }, { UserId: id });
    this.props.actions.updateShow(updateShowData);
  }else{
    const newShowData = Object.assign({ ...formData }, { UserId: id, Id: uuidv4() });
    this.props.actions.newShow(newShowData);
  }
 }  
 
 showEpisodesDetails = ()=>{
   this.props.history.push(`/episodes`)
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
  toggleEditShowModal = (channel) => { 
    const {showModal : {show = false}, pageDropDown:{channelsByUser=[]}} = this.props; 
     const {name = "Demo1",    description= "Demo 2", id='', channelId='',  imageFullURL = '', imageURL = '' } = channel;

     let previewFile = [];
     previewFile.push({
       // the server file reference
       source: imageFullURL,
       // set type to limbo to tell FilePond this is a temp file
       options: {
         type: 'local',
         // stub file information
         file: {
           name: 'my-file.png',
           size: 3001025,
           type: 'image/png'
         },
         // pass poster property
         metadata: {
           poster: imageFullURL
         }
       }
     });

     const togg = { showModal: {
       show: !show,
       title: 'Edit Show',
       mode : 'edit',
       buttonText: 'Update Show',
       formData:   {
      name,
       description, 
       id,
       channelId,
       imageFullURL,
       imageURL,
       previewFile
       },
       channelsByUser
     }}; 
     /* to save in loacal State */
     this.setState({newShowModalData: {
       formData : { 
       name,
       description,
       id,
       channelId,
       imageFullURL,
       imageURL,
       previewFile
     },}});     
     this.props.actions.onclickModal(togg);
  }
  deleteShow = (show) => {
    const {user:{id=''}} = this.props;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this show file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.props.actions.deleteShow({ UserID: id, ShowId : show.id});
        this.loadPageData();
      } else {
        swal("Your show is safe!");
      }
    });
   
  
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
          handleFileChange={this.handleFileChange}     
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
              icon: 'movie_creation',
              tooltip: 'Epidoes',
              onClick: (event, rowData) => this.showEpisodesDetails(rowData)
            },
            {
              icon: 'edit',
              tooltip: 'edit Show',
              onClick: (event, rowData) => this.toggleEditShowModal(rowData)
            },
            rowData => ({
              icon: 'delete',
              tooltip: 'Delete Show',
              onClick: (event, rowData) => this.deleteShow(rowData),
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
  const {Auth:{user={}}, ShowPageReducer : {showNotification,shows=[],
     loading=false, showModal={}, channelsByUser} }= state;

  shows.map((show, ind)=>{
   let selectChan = channelsByUser.filter((channel) =>
    channel.id == show.channelId)
     show[`channel`] =selectChan[0];
  });
  return {  user , shows,loading, showModal,showNotification, pageDropDown:{channelsByUser} };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);