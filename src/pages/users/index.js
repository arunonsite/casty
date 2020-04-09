import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { Table, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify';
import { notifyMe} from '../../helpers/applicationUtils';
import { v4 as uuidv4 } from 'uuid';
import  * as userActions from '../../redux/user/actions';

import { getLoggedInUser, findTheAccess  } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

import MaterialTable from "material-table";
import appSettings from '../../App.Settings';
const resetNotification  = {userNotification : {notify:false,mode:0,  message:''}};
class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUserModalData :{
        formData : {
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          cpassword: '',
          email: '',
          cemail: '',
           phone: '',
           role :'',blocked:null, roleSelected : ['Admin'],
        },
      }
    
    };
    this.tableRef = React.createRef();
  }
  componentDidUpdate(){ 
  
    const { userNotification: { notify = false, message = 'Success' } } = this.props;
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
    this.props.actions.resetUserNotification(resetNotification);
    } 
   
  }
  componentDidMount(){
    //this.loadPageData();   
    const {user:{id='', companyID }, currentUsrAccess } = this.props;
    this.props.actions.loadCompanyListForUser({companyID, currentUsrAccess});   
      
  }
   loadPageData = () => {  //this.state.departments.push()
    const {user:{CompanyID='02790222-8153-44e0-b17b-0ff24a3f4d4d' }, currentUsrAccess} = this.props;
    this.props.actions.loadUsers({CompanyID,currentUsrAccess});
   }
  handleChange = (event, field) => {
    const {newUserModalData :{formData={}}} = this.state;
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

    }else if(event.target.name === 'companyID'){
      this.props.actions.loadDepartmentListForUser({ companyID : event.target.value, currentUsrAccess:false});
      formData[event.target.name] = event.target.value;
     }
    else{
    formData[event.target.name] = event.target.value;
    } 
    this.setState({newUserModalData: {formData : formData}});
  }
  
  handleSubmit = (event) => {
   const { user: { id = '' }, userModal: { mode = "edit" } } = this.props;
   const { newUserModalData: { formData = {} } } = this.state;
   if (mode === 'edit') {
     const uptCHannelData = Object.assign({ ...formData }, { UserId: id });
     this.props.actions.updateUser(uptCHannelData);
   } else {
     const newUserData = Object.assign({ ...formData }, {  UserId: id,  Id: uuidv4() });
    this.props.actions.newUser(newUserData);
   }
  }

  toggleNewUserModal = () => {
    const {userModal : {show = false}, pageDropDown:{roleSource=[], availableCompany=[]}} = this.props;    
    const togg = { userModal: {
      show: !show,
      title: 'New User',
      mode : 'add',
      data:   {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        cpassword: '',
        email: '',
        cemail: '',
        phone: '',
        role : '',
        companyID:'',
        roleSelected : ['Admin'],
        roles : ['Admin'],
        blocked:null,
        DepartmentID :''
      },
      constants: {roleSource}
    }};


    this.setState({
      newUserModalData: {
        formData: {
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          cpassword: '',
          email: '',
          cemail: '',
          phone: '',
          role : '',
          companyID:'',
          roleSelected : ['Admin'],
          blocked:null,
          roles : ['Admin'],
          DepartmentID :''
        },
      }
    });


    this.props.actions.onclickModal(togg);   
  }
  toggleEditUserModal = (user) => {
    const {userModal : {show = false}, pageDropDown:{roleSource=[]}} = this.props;   
    const {roles, firstName= '',lastName= '',password= '',cpassword= '',email= '',cemail= '',
    phone= '',companyID='', id='', role='',blocked=null, departmentId=''} = user   
    let roleSelected = [];
  roleSource.map((rolev, ind)=>{
    const tempRole = roles.filter((roled) =>{
      return rolev === roled
    });
    if(tempRole[0] !== undefined){
      roleSelected.push(tempRole[0]);
    }   
  });

    
    const togg = { userModal: {
      show: !show,
      title: 'Edit User',
      mode : 'edit',
      data:   { ID :id,departmentId, 
        roles,roleSelected, firstName,lastName,password,cpassword,email,cemail,phone ,companyID,blocked
      }
    }};


   /* to save in loacal State */
   this.setState({
    newUserModalData: {
       formData: { departmentId,blocked,ID :id, roles,roleSelected, firstName,lastName,password,cpassword,email,cemail,phone,companyID
       }
     }
   });
   this.props.actions.onclickModal(togg);
  }
  
  handleFilterTextChange = (event, field) => {
    this.setState({ filterText: event.target.value });
    if (event.target.value === '') {
      this.props.actions.handleSearchText({ filterText: " " });
      this.tableRef.current.onQueryChange();
    }
  }
  handleSearch = (event, field) => {
    const { filterText } = this.state;
    this.props.actions.handleSearchText({ filterText });
    this.tableRef.current.onQueryChange('show');
  }
  render() {
    const {  newUserModalData } = this.state;
    const{users=[], userModal={},currentUsrAccess, user:{id='', companyID=''} , 
     pageDropDown ={}, filterText} =this.props;
    
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
          {...newUserModalData}
          currentUsrAccess={currentUsrAccess}
          pageDropDown =  {pageDropDown}
       
        />
  <div className="">
     
            <div class="row">
              <div class="col-sm-8" >
                <div class="page-title-box">
                  <h4 class="page-title">Users</h4>
                </div>
              </div>
              <div class="col-sm-3 text-sm-right custom-top">
              <div className="app-search">
                <div className="app-search-box">
                  <div className="input-group">
                    <input type="search" className="form-control"
                      onChange={(event) => this.handleFilterTextChange(event)}
                      placeholder="Search..." />
                    <div className="input-group-append custom-search">
                      <button className="btn" onClick={(event) => this.handleSearch(event)} >
                        <i className="fe-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div class="col-sm-1.5">
                <div class="text-sm-right custom-top" >
                <span href="#custom-modal" onClick={this.toggleNewUserModal} class="btn btn-primary waves-effect waves-light"
                                             data-animation="fadein" data-plugin="custommodal"
                                              data-overlayColor="#38414a"><i class="mdi mdi-plus-circle mr-1">
                                                </i> Add</span>
                 
                </div>
              </div>


            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card-box">

             

                <MaterialTable  
                     tableRef={this.tableRef}
          columns={[
            { title: "First Name", field: "firstName",  
            headerStyle: {
              color: '#aebbc5',
              fontSize:'13px'

            } },
            { title: "Last Name", field: "lastName" },
            { title: "Email", field: "email" },
           
            { title: "Company", field: "companyName"  },
            { title: "Status", field: "blocked", render: rowData => (rowData.blocked !== null ? <span class="badge badge-danger badge-pill">InActive</span> :<span  class="badge badge-success badge-pill">Active</span>) },
           
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = appSettings.API_ROUTE.MAIN_SITE;
               if(currentUsrAccess === 0){
                url = url+'/api/Users'   
                let sera = query.search !== '' ? query.search : filterText !== '' ? filterText : " ";
                let skp =  query.pageSize*query.page;
               let take =  query.pageSize*query.page + query.pageSize;
               url += '/'+sera+'/SkipTake/' +skp;                        
               url += '/' + query.pageSize   
              }else{
                url =  url+'/api/Users/ByCompany/'+companyID 
                let sera = query.search !== '' ? query.search : filterText !== '' ? filterText : " ";
                let skp =  query.pageSize*query.page;
                let take =  query.pageSize*query.page + query.pageSize;
                url += '/'+sera+'/' +skp;                        
                url += '/' + query.pageSize  
              }                   
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
                          <li  style={{padding:"0px !important"}} onClick={(event) => props.action.onClick(event, props.data)}>                            
                          <a href="#" style={{padding:"0px !important"}}><i class="mdi mdi-square-edit-outline"></i>Edit</a>
                          </li>                         

                      </ul>
                  </li>
                </ul>
              </div>
            ),
          }}
          options={{
            loadingType :'overlay',
            maxBodyHeight : 'auto',
            search: false,
            showTitle :false,
            tableLayout :"auto",
           
            pageSize : 10,
            actionsColumnIndex: -1,
          /*   rowStyle: {
              backgroundColor: '#f1f5f7',
            }, */ //tableData
            rowStyle: rowData => ({
              backgroundColor: (rowData.tableData.id % 2 == 0) ? '#f1f5f7' : '#FFF'
            }),
            headerStyle: {
              color:"#aebbc5",
              fontSize:"12px",
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
    actions: bindActionCreators(userActions, dispatch),
  };
}
const mapStateToProps = (state) => {
 
   const {UserPageReducer: {filterText = '',availableDepartment=[], availableCompany=[],users=[], userModal={},loading=false,userNotification={}}, 
   Auth:{user={},user:{roles=[]},  applicationDynamicConstants:{roleSource={}}} }= state;
   const currentUsrAccess =findTheAccess(roles);
  return { filterText,users ,userModal,userNotification, loading,  user,currentUsrAccess, 
     pageDropDown:{availableCompany, roleSource, availableDepartment}};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
