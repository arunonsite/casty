import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { Table, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify';
import { notifyMe} from '../../helpers/applicationUtils';
import { v4 as uuidv4 } from 'uuid';
import  * as departmentAction from '../../redux/department/actions';
import swal from 'sweetalert'
import { getLoggedInUser, findTheAccess  } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

import MaterialTable from "material-table";
import appSettings from '../../App.Settings';
const resetNotification  = {departmentNotification : {notify:false,mode:0,  message:''}};
class DepartmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDepartmentModalData :{
        formData : {
          name: '',
          description: '',
          companyID:'' 
        },
      }
    
    };
    this.tableRef = React.createRef();
  }
  componentDidUpdate(){ 
  
    const { departmentNotification: { notify = false, message = 'Success' } } = this.props;
    if (notify) {
      toast.success(message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      this.loadPageData();
    this.props.actions.resetDepartmentNotification(resetNotification);
    } 
   
  }
  componentDidMount(){
    this.loadPageData();   
    const {user:{id='', companyID }, currentUsrAccess } = this.props;
    //this.props.actions.loadCompanyListForUser({companyID, currentUsrAccess}); 
    this.props.actions.loadCompanyListForDepartment({companyID, currentUsrAccess});     
  }
   loadPageData = () => {  //this.state.departments.push()
    const {user:{CompanyID='02790222-8153-44e0-b17b-0ff24a3f4d4d' }, currentUsrAccess} = this.props;
    this.props.actions.loadDepartemnt({CompanyID,currentUsrAccess});
   }
  handleChange = (event, field) => {
    const {newDepartmentModalData :{formData={}}} = this.state;
    const {user: { id = ''}} =  this.props;
    if(event.target.name ==='role'){
      formData['roleSelected'] = [event.target.value];
      formData['roles'] = [event.target.value];
    }else if(event.target.name ==='blocked'){
      if(event.target.checked){
        formData[event.target.name] = null;
      }else{
        formData[event.target.name] = new Date();;
        formData['BlockedBy'] = id;       
      }

    }else{
       console
       .log("event.target.name=", event.target.name, event.target.value);
    formData[event.target.name] = event.target.value;
    }
    this.setState({newDepartmentModalData: {formData : formData}});
  }
  
  handleSubmit = (event) => {
   const { user: { id = '' }, departmentModal: { mode = "edit" } } = this.props;
   const { newDepartmentModalData: { formData = {} } } = this.state;
   if (mode === 'edit') {
     const uptCHannelData = Object.assign({ ...formData }, { UserId: id });
     this.props.actions.updateDepartment(uptCHannelData);
   } else {
     const newUserData = Object.assign({ ...formData }, {  UserId: id,  Id: uuidv4() });

     this.props.actions.newDepartment(newUserData);
   }
  }

  toggleNewDepartmentModal = () => {
    const {departmentModal : {show = false}, pageDropDown:{roleSource=[], availableCompany=[]}} = this.props;    
    const togg = { departmentModal: {
      show: !show,
      title: 'New User',
      mode : 'add',
      data:   {
        name: '',
        description: '',
        companyID:''       
      },
      constants: {roleSource}
    }};


    this.setState({
      newDepartmentModalData: {
        formData: {
          name: '',
          description: '',
          companyID:''    
        },
      }
    });


    this.props.actions.onclickModal(togg);   
  }
  toggleEditDepartmentModal = (event, user) => {
    const {departmentModal : {show = false}, pageDropDown:{roleSource=[]}} = this.props;   
    const {  name = '',
    description= '',
    companyId='' , id=''   } = user   

     console
     .log("toggleEditDepartmentModal---", user);


    
    const togg = { departmentModal: {
      show: !show,
      title: 'Edit Department',
      mode : 'edit',
      data:   {  name , 
      description  ,
      companyID :companyId,
      departmentId :id,
      
      }
    }};


   /* to save in loacal State */
   this.setState({
    newDepartmentModalData: {
       formData: {
        name,
      description ,
      companyID :companyId,
      departmentId :id,

       }
     }
   });
   this.props.actions.onclickModal(togg);
  }
  deleteDepartment = (event, dept) => {
     console.log("channel---", dept);
    const { user: { id = '' } } = this.props;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Channel file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.actions.deleteDepartment({ UserID: id, DepartmentId: dept.id });
          this.loadPageData();
        } else {
          swal("Your Channel is safe!");
        }
      });


  }

  render() {
    const {  newDepartmentModalData } = this.state;
    const{allProcessedDepartment=[], users=[], departmentModal={},currentUsrAccess, user:{id='', companyID=''} ,  pageDropDown ={}} =this.props;
    
    return (
      <React.Fragment>
       
        <Modal
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}          
          handlehide={this.toggleNewDepartmentModal}         
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          {...departmentModal}
          {...newDepartmentModalData}
          currentUsrAccess={currentUsrAccess}
          pageDropDown =  {pageDropDown}
       
        />
  <div className="">
     
            <div class="row">
              <div class="col-sm-8" >
                <div class="page-title-box">
                  <h4 class="page-title">Departments</h4>
                </div>
              </div>
              <div class="col-sm-2">
                <div class="text-sm-right custom-top">
                  <form>
                    <div class="form-group">
                      <input type="search" class="form-control" id="inputPassword2" placeholder="Search User" />
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-sm-2">
                <div class="text-sm-right custom-top" >
                <span href="#custom-modal" onClick={this.toggleNewDepartmentModal} class="btn btn-primary waves-effect waves-light"
                                             data-animation="fadein" data-plugin="custommodal"
                                              data-overlayColor="#38414a"><i class="mdi mdi-plus-circle mr-1">
                                                </i> Add New</span>
                 
                </div>
              </div>


            </div>
            <Row>

            {allProcessedDepartment.map((cols) => (
                <div class="card-deck">
                  {cols.map((col, indepos) => (

<div class="card">
<img class="card-img-top img-fluid" src="http://localhost:3001/assets/images/small/img-4.jpg" alt="Card image cap" />
<div class="card-body">
    <h5 class="card-title">{col.name}</h5>

    <div>
      <ul class="navigation-menu">

                            <li class="has-submenu" style={{ float: "right", marginTop: "-50px" }}>
                              <a href="#" style={{ color: "#000" }}>
                                <i class="mdi mdi-transit-connection"></i></a>
                              <ul class="submenu submenu-channel">
                                <span onClick={(colo) => this.toggleEditDepartmentModal(colo, col)} style={{ cursor: "pointer", padding: "0px !important" }}  >
                                  <i class="mdi mdi-square-edit-outline"></i> Edit
                                </span>
                                <br />
                                <span style={{ cursor: "pointer" }}
                                  onClick={(colo) => this.deleteDepartment(colo, col)}>
                                  <i class="mdi mdi-delete"></i> Delete

                                </span>

                              </ul>
                            </li></ul></div>
                       
    <p class="card-text">{col.description}</p>
     <a href="javascript:void(0);" class="btn btn-primary">GO TO CHANNELS</a>
</div>
</div>


                  



                  ))}
                </div>
              ))}

            </Row>
        
        </div>
   
      </React.Fragment>
    )
  }
}



function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(departmentAction, dispatch),
  };
}
const mapStateToProps = (state) => {
   console
   .log("MAin Start == ", state);
   const {
     DepartmentPageReducer: {departments=[], availableCompany=[],users=[], departmentModal={},
     loading=false,departmentNotification={}}, 
   Auth:{user={},user:{roles=[]}, 
    applicationDynamicConstants:{roleSource={}}} }= state;
   const currentUsrAccess =findTheAccess(roles);

    console.log("departments---", departments);

   var departmentDemo = [], size = 4;
   let groupDepartment = [];
   departments.map((epi, index) => {
    groupDepartment.push(epi);
    if ((index + 1) % 3 === 0 || departments.length === index + 1) {
      departmentDemo.push(groupDepartment);
      groupDepartment = [];
    }

  });


  return {allProcessedDepartment: departmentDemo, departments, users ,departmentModal,departmentNotification, loading,  user,currentUsrAccess,  pageDropDown:{availableCompany, roleSource}};
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentPage);
