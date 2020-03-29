import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { Table, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify';
import { notifyMe} from '../../helpers/applicationUtils';
import { v4 as uuidv4 } from 'uuid';
import  * as departmentAction from '../../redux/department/actions';

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
    //  this.loadPageData();.
    this.tableRef.current.onQueryChange()
    this.props.actions.resetDepartmentNotification(resetNotification);
    } 
   
  }
  componentDidMount(){
    //this.loadPageData();   
    const {user:{id='', companyID }, currentUsrAccess } = this.props;
    //this.props.actions.loadCompanyListForUser({companyID, currentUsrAccess}); 
    this.props.actions.loadCompanyListForDepartment({companyID, currentUsrAccess});     
  }
   loadPageData = () => {  //this.state.departments.push()
    const {user:{CompanyID='02790222-8153-44e0-b17b-0ff24a3f4d4d' }, currentUsrAccess} = this.props;
    this.props.actions.loadUsers({CompanyID,currentUsrAccess});
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

  toggleNewUserModal = () => {
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
  toggleEditUserModal = (user) => {
    const {departmentModal : {show = false}, pageDropDown:{roleSource=[]}} = this.props;   
    const {  name = '',
    description= '',
    companyId='' , id=''   } = user   

     console
     .log("toggleEditUserModal---", user);


    
    const togg = { departmentModal: {
      show: !show,
      title: 'Edit User',
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
  

  render() {
    const {  newDepartmentModalData } = this.state;
    const{users=[], departmentModal={},currentUsrAccess, user:{id='', companyID=''} ,  pageDropDown ={}} =this.props;
    
    return (
      <React.Fragment>
       
        <Modal
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}          
          handlehide={this.toggleNewUserModal}         
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
                <span href="#custom-modal" onClick={this.toggleNewUserModal} class="btn btn-primary waves-effect waves-light"
                                             data-animation="fadein" data-plugin="custommodal"
                                              data-overlayColor="#38414a"><i class="mdi mdi-plus-circle mr-1">
                                                </i> Add New</span>
                 
                </div>
              </div>


            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card-box">

             

                <MaterialTable  
                     tableRef={this.tableRef}
          columns={[
            { title: "Name", field: "name",  
            headerStyle: {
              color: '#aebbc5',
              fontSize:'13px'

            } },
            { title: "Description", field: "description" }
            
           
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = appSettings.API_ROUTE.MAIN_SITE;
              let comc = '1267d5ae-ca26-421c-837d-286c2c8c6818';
              url =  url+'/api/Departments/'+comc
                              
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  if(result.data !== undefined){
                    resolve({
                      data: result.data,
                      page: result.page - 1,
                      totalCount: result.totalRecords,
                      per_page:query.pageSize,
                      "page":result.pageNumber-1,
                    })
                  }else{
                    resolve({
                      data  : result,
                      totalCount: result.length,
                      per_page:query.pageSize,
                      page:query.page,
                    })
                  }              
                })
            })
          }
       
          detailPanel={[     
            {
              icon: 'account_circle',
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
                   Hello !  {rowData.firstName}
                   
                  </div>
                )
              },
            }
          ]}
          actions={[
           
            {
              icon: 'edit',
              tooltip: 'edit Show',
              onClick: (event, rowData) => this.toggleEditUserModal(rowData)
            }
          ]}
          components={{
            Action: props => (
              <div id="navigation">
             
              <ul class="navigation-menu">
  
                  <li class="has-submenu">
                      <a href="#"  style={{color:"#000"}}>
                         <i class="mdi mdi-transit-connection"></i></a>
                      <ul class="submenu">
                          <li  onClick={(event) => props.action.onClick(event, props.data)}>
                            
                            Edit
                          </li>
                      {/*     <li  onClick={(event) => this.deleteCompany(event, props.data)}>                            
                                      Delete
                                    </li>   */}
                         
                      </ul>
                  </li></ul></div>
            ),
          }}
          options={{
            loadingType :'overlay',
            maxBodyHeight : 'auto',
            search: false,
            showTitle :false,
            tableLayout :"auto",
            searchText:'A',
            pageSize : 20,
            actionsColumnIndex: -1,
          /*   rowStyle: {
              backgroundColor: '#f1f5f7',
            }, */ //tableData
            rowStyle: rowData => ({
              backgroundColor: (rowData.tableData.id % 2 == 0) ? '#f1f5f7' : '#FFF'
            }),
            headerStyle: {
              color:"#aebbc5",
              fontSize:"13px",
              fontWeight: "bold"
            },
           
             title:false
          }}
        />  

               
            </div>



          </div>
        </div>
 
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
   const {DepartmentPageReducer: {availableCompany=[],users=[], departmentModal={},loading=false,departmentNotification={}}, 
   Auth:{user={},user:{roles=[]},  applicationDynamicConstants:{roleSource={}}} }= state;
   const currentUsrAccess =findTheAccess(roles);
  return { users ,departmentModal,departmentNotification, loading,  user,currentUsrAccess,  pageDropDown:{availableCompany, roleSource}};
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentPage);
