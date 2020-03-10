import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { toast } from 'react-toastify';
import swal from 'sweetalert'
import  * as showActions from '../../redux/show/actions';
import { bindActionCreators } from 'redux';
import MaterialTable from "material-table";
import { getLoggedInUser,findTheAccess } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';
import { v4 as uuidv4 } from 'uuid';
import appSettings from '../../App.Settings';
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
    this.tableRef = React.createRef();
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
          //this.loadPageData();
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
      this.tableRef.current.onQueryChange();
     this.props.actions.resetShowNotification(resetNotification);
      // this.loadPageData();
    } 
  }


  componentDidMount(){
    const {user:{id='',currentUsrAccess =1, companyID }} = this.props;
   // this.props.actions.loadChannelsByUser({id, currentUsrAccess});

    console.log("currentUsrAccess--Show>--",currentUsrAccess);
   
    this.props.actions.loadCompanyListForShow({companyID, currentUsrAccess});
    this.props.actions.loadChannelsListForShow({id, currentUsrAccess, companyID});
    //this.loadPageData();    
  }
 

 loadPageData = () => {  //this.state.departments.push()
  const {user:{id='',companyID=''}} = this.props;
  this.props.actions.loadShows({id,companyID});
 }
 handleChange =  (event, field) => {
   const { newShowModalData: { formData = {} } } = this.state;
   let proceddesData = {};
   proceddesData[event.target.name] = event.target.value;
   this.setState({ newShowModalData: { formData: { ...formData, ...proceddesData } } });
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
 
 showEpisodesDetails = (sjow)=>{
    const {id=''} = sjow;
   this.props.history.push('/episodes/'+id)
 }
 toggleShowModal = () => {
   const {showModal : {show = false}, pageDropDown:{channelsByUser=[]},
   user:{companyID='', id=''},} = this.props; 
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
       companyID

     },
     channelsByUser
   }};  
   this.setState({newShowModalData: {
     formData : { 
       name :'',
       description:'', 
       channelId:'',
       channelName:'',
       companyID
   },
   channelsByUser}});  
   this.props.actions.onclickModal(togg);
  }
  toggleEditShowModal = (channel) => { 
    const {showModal : {show = false},user:{companyID='' }, pageDropDown:{channelsByUser=[]}} = this.props; 
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
       Id : id,
       channelId,
       imageFullURL,
       imageURL,
       previewFile,
       companyID
       },
       channelsByUser
     }}; 
     /* to save in loacal State */
     this.setState({newShowModalData: {
       formData : { 
       name,
       description,
       Id : id,
       channelId,
       imageFullURL,
       imageURL,
       previewFile,
       companyID
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
        //this.loadPageData();
      } else {
        swal("Your show is safe!");
      }
    });
   
  
   }
  render() { 
    //const {newShow:{name='', description='', cphoto=''}} = this.state;
    const {     newShowModalData={} } = this.state;
    const {shows=[], showModal={}, user:{companyID='', id=''}, currentUsrAccess, pageDropDown} = this.props;
    return (
      <React.Fragment>       
        <Modal
          handleSubmit={this.handleSubmit}    
          handleChange={this.handleChange}          
          handlehide={this.toggleShowModal}    
          handleFileChange={this.handleFileChange}     
          pageDropDown={pageDropDown}     
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
                    tableRef={this.tableRef}
          columns={[
            { title: " Name", field: "name" },
            { title: " Description", field: "description" },
            { title: "Channel", field: "channel.name" 
              },
           
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = appSettings.API_ROUTE.MAIN_SITE;    
              let sera = query.search !== '' ? query.search : ' ';
              let skp =  query.pageSize*query.page;
              let take =  query.pageSize*query.page + query.pageSize;  
              
              ///api/Shows/{SearchCriteria}/SkipTake/{Skip}/{Take}
              if(currentUsrAccess <= 0){
               /// url = 'https://casty.azurewebsites.net/api/Shows/ByCompany/'+companyID+'/'     
                url = url+'/api/Shows/'    
                url += '/'+sera+'/SkipTake/' +skp;    ///api/Shows/{SearchCriteria}/SkipTake/{Skip}/{Take}                    
                url += '/' + query.pageSize 
              }else{
                url = url+'/api/Shows/ByCompany/'+companyID 
                url += '/'+sera+'/' +skp;                        
                url += '/' + query.pageSize 
              } 
              
             
                console
                .log("url==", url);                    
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.totalRecords,
                    per_page:query.pageSize,
                    "page":result.pageNumber-1,
                  })
                })
            })
          }
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
   
  const { ShowPageReducer : {showNotification,shows=[],
     loading=false, showModal={}, availableCompany=[], availableChannel=[]} ,  

     Auth:{user={},user:{roles=[]}} }= state;
      
  const currentUsrAccess =findTheAccess(roles);
    
   shows.map((show, ind)=>{
   let selectChan = availableChannel.filter((channel) =>
    channel.id == show.channelId)
     show[`channel`] =selectChan[0];
  }); 
  return {currentUsrAccess,   user , shows,loading,
     showModal,showNotification, pageDropDown:{availableCompany, availableChannel} };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);