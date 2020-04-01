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
     this.props.actions.resetShowNotification(resetNotification);
       this.loadPageData();
    } 
  }


  componentDidMount(){
    const {user:{id='', companyID }, currentUsrAccess =1} = this.props;   
    this.props.actions.loadCompanyListForShow({companyID, currentUsrAccess});
    this.props.actions.loadChannelsListForShow({id,  companyID, currentUsrAccess,});
    this.loadPageData();    
  }
 

 loadPageData = () => {  //this.state.departments.push()
  const {user:{id='',companyID=''}, currentUsrAccess} = this.props;
  const channelId = this.props.match.params.id;
  this.props.actions.loadShows({id,companyID, currentUsrAccess, channelId});
 }
 handleChange =  (event, field) => {
   const { newShowModalData: { formData = {} } } = this.state;
   const {user:{id='',companyID=''}, currentUsrAccess} = this.props;
   let proceddesData = {};
   proceddesData[event.target.name] = event.target.value;
   if(event.target.name === 'companyID'){
    this.props.actions.loadChannelsListForShow({id, companyID : event.target.value, currentUsrAccess:false});
    proceddesData[event.target.name] = event.target.value;
   }
   // console.log("event.target.name--", event.target.name, event.target.value);

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
   // console.log("newShowData---", newShowData);
  }

 
 }  
 
 showEpisodesDetails = (event, sjow)=>{
    const {id=''} = sjow;
   this.props.history.push('/episodes/'+id)
 }
 toggleShowModal = () => {
   const {showModal : {show = false}, pageDropDown:{availableCompany=[], availableChannel=[]},
   user:{companyID='', id=''},} = this.props; 
   const { newShowModalData:{formData={}}} = this.state;   
   const togg = { showModal: {
     show: !show,
     title: 'Add New Show',
     mode : 'add',
     buttonText : 'Save',
     formData:   {
       name :'',
       description:'', 
       channelId: '0',//availableChannel[0]["id"],   
       companyID :'0',//availableCompany[0]["id"] !== undefined  ? availableCompany[0]["id"] : companyID

     },
     
   }};  
   this.setState({newShowModalData: {
     formData : { 
       name :'',
       description:'', 
       channelId:'0',//availableChannel[0]["id"],   
       companyID :'0',//availableCompany[0]["id"] !== undefined  ? availableCompany[0]["id"] : companyID
   },
   }});  
   this.props.actions.onclickModal(togg);
  }
  toggleEditShowModal = (event , channel) => { 
    console.log("channel---", channel);

    const {showModal : {show = false},user:{companyID='' }, pageDropDown:{availableChannel=[], channelsByUser=[]}} = this.props; 
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

     //Prepare COmpany ID for teh channnel

      let filteredchannel = availableChannel.filter(channel => {
      return channel.id === channelId;
  }); 
  const showCompanyId = (filteredchannel[0] !== undefined) ? filteredchannel[0].companyId : '';
   console.log("showCompanyId", channelsByUser);
   console.log("channelId--", channelId);


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
       companyID : showCompanyId
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
       companyID : showCompanyId
       
     },}});     
     this.props.actions.onclickModal(togg);
  }
  deleteShow = (event , show) => {

    console.log("show---", event);
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
    const { shows=[], allProcessedShows=[],
    showModal={}, user:{companyID='', id=''}, currentUsrAccess,
    pageDropDown:{availableChannel=[], channelsByUser=[]}, pageDropDown={}
     } = this.props;
   
  
   
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



          <Row>

          <div class="row">
            <div class="col-12">
              <div class="row" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <div class="col-sm-6">
                  <h4 >Shows</h4>
                </div>
                <div class="col-sm-6">
                  <div class="text-sm-right" >
                  <span href="#custom-modal" onClick={this.toggleShowModal} class="btn btn-primary waves-effect waves-light"
                                             data-animation="fadein" data-plugin="custommodal"
                                              data-overlayColor="#38414a"><i class="mdi mdi-plus-circle mr-1">
                                                </i> Add New</span>
                  </div>
                </div>
              </div>
              {allProcessedShows.map((cols) => (
                <Row className="row filterable-content">
                  {cols.map((col, indepos) => (


                    <Col className="col-sm-12 col-xl-3 filter-item all  ">
                      <div class="gal-box" style={{ height: "400px" }}>
                        <div class="gall-info"
                         style={{ padding: " 15px 15px 0 15px" }}> <h4 class="font-16 mt-0">{col.name} </h4></div>
                        <div id="navigation">
                        <ul class="navigation-menu">

<li class="has-submenu" style={{ float: "right", marginTop: "-50px" }}>
  <a href="#" style={{ color: "#000" }}>
    <i class="mdi mdi-transit-connection"></i></a>
  <ul class="submenu submenu-channel">
    <span onClick={(colo) => this.toggleEditShowModal(colo, col)} style={{ cursor: "pointer", padding: "0px !important" }}  >
      <i class="mdi mdi-square-edit-outline"></i> Edit
    </span>
    <br />
    <span style={{ cursor: "pointer" }}
      onClick={(colo) => this.deleteShow(colo, col)}>
      <i class="mdi mdi-delete"></i> Delete

    </span>

  </ul>

                            </li></ul></div>
                            <div>
                        <img src={col.imageFullURL} class="img-fluid" alt="work-thumbnail" />
                        </div>
                        <div class="gall-info">
                          <p>{col.description}</p>
                          <p  onClick={(colo) => this.showEpisodesDetails(colo, col)} style={{ cursor:"pointer",  color: "#ff7a4c", fontSize: "12px", fontWeight: "bold" }}>View Episodes</p>
                        </div>
                      </div>
                    </Col>



                  ))}
                </Row>
              ))}


            </div>
          </div>
          </Row>
         {/*  <Row class='hidden'>
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
            { title: "Channel", field: "channel.name" ,
            render: rowData =>  {
              let filteredchannel = availableChannel.filter(channel => {
                return channel.id === rowData.channelId;
            }); 
              return (filteredchannel[0] !== undefined) ? filteredchannel[0].name : '-';
              
            }
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

 */}
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

  var showDemo = [], size = 4;
  const { ShowPageReducer : {showNotification,shows=[],
     loading=false, showModal={}, availableCompany=[], availableChannel=[]} ,  

     Auth:{user={},user:{roles=[]}} }= state;
      
  const currentUsrAccess =findTheAccess(roles);
    
   shows.map((show, ind)=>{
   let selectChan = availableChannel.filter((channel) =>
    channel.id == show.channelId)
     show[`channel`] =selectChan[0];
  }); 

  
  let groupShows = [];
  shows.map((epi, index) => {
    groupShows.push(epi);
    if ((index + 1) % 4 === 0 || shows.length === index + 1) {
      showDemo.push(groupShows);
      groupShows = [];
    }

  });
  return {currentUsrAccess, allProcessedShows: showDemo,   user , shows,loading,
     showModal,showNotification, pageDropDown:{availableCompany, availableChannel} };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);