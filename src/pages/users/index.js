import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { Table, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify';
import { notifyMe} from '../../helpers/applicationUtils';

import  * as userActions from '../../redux/user/actions';

import { getLoggedInUser, findTheAccess  } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

import MaterialTable from "material-table";
import appSettings from '../../App.Settings';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserModalData :{
        formData : {
          fname: '',
          lname: '',
          username: '',
          password: '',
          cpassword: '',
          email: '',
          cemail: '',
           phone: '',
           role :''
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
    } 
  }
  componentDidMount(){
    //this.loadPageData();      
  }
   loadPageData = () => {  //this.state.departments.push()
    const {user:{CompanyID='02790222-8153-44e0-b17b-0ff24a3f4d4d' }, currentUsrAccess} = this.props;
    this.props.actions.loadUsers({CompanyID,currentUsrAccess});
   }
  handleChange = (event, field) => {
    const {newUserModalData :{formData={}}} = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({newUserModalData: {formData : formData}});
  }
  
  handleSubmit = (event) => {
    const {user:{id='', companyID=''}} = this.props;
    const { newUserModalData:{formData={}}} = this.state; 
    const newUserData= Object.assign({...formData}, {parentId : id,companyID });
   this.props.actions.newUser(newUserData);
  }

  toggleNewUserModal = () => {
    const {userModal : {show = false},roleSource={}} = this.props;   
    const togg = { userModal: {
      show: !show,
      title: 'New User',
      mode : 'add',
      data:   {
        fname: '',
        lname: '',
        username: '',
        password: '',
        cpassword: '',
        email: '',
        cemail: '',
         phone: '',
         role : ''
      },
      constants: {roleSource}
    }};
    this.props.actions.onclickModal(togg);   
  }
  toggleEditUserModal = (user) => {
    const {userModal : {show = false}} = this.state;   
    this.setState({ 
      userModal: {      show: !show,      title: 'Edit User',      mode : 'edit' ,
      data:   {...user},   
    },      
    }
    );
  }
  

  render() {
    const {  newUserModalData } = this.state;
    const{users=[], userModal={},currentUsrAccess, user:{id='', companyID=''} } =this.props;
    
    return (
      <React.Fragment>
        <Modal
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}          
          handlehide={this.toggleNewUserModal}         
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          {...newUserModalData}
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
                  <h1>User List</h1>
                  <Button style={{ float: "right" }} variant="secondary" >
                    + New User        </Button>

                    <MaterialTable style={{ border: "1px solid #dee2e6" }}
                     tableRef={this.tableRef}
          columns={[
            { title: "First Name", field: "firstName" },
            { title: "Last Name", field: "lastName" },
           
            { title: "Company", field: "companyName"  },
            { title: "Phone", field: "phone", },
           
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = appSettings.API_ROUTE.MAIN_SITE;  
               if(currentUsrAccess === 0){
                 url = url+'/api/Users/'   
                let sera = query.search !== '' ? query.search : ' ';
                let skp =  query.pageSize*query.page;
                let take =  query.pageSize*query.page + query.pageSize;
                url +=  '/SkipTake/' +skp;                        
                url += '/' + query.pageSize   
               }else{
                 url = url+'/api/Users/ByCompany/'+companyID 
               }  
                console
                .log("url==", url);                    
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  if(result.data !== undefined){
                    resolve({
                      data: result.data ,
                      page: result.page - 1,
                      totalCount: result.totalRecords,
                      per_page:query.pageSize,
                      page:result.query,
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
          title="Users  "
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
              icon: 'add_circle',
              tooltip: 'Add User',
             
              isFreeAction: true,
              onClick: (event) => this.toggleNewUserModal()
            },
            {
              icon: 'edit',
              tooltip: 'Edit User',
              onClick: (event, rowData) => this.toggleEditChannelModal()
            },
            rowData => ({
              icon: 'delete',
              color: 'error',
              tooltip: 'Delete User',
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
    actions: bindActionCreators(userActions, dispatch),
  };
}
const mapStateToProps = (state) => {
   const {UserPageReducer: {users=[], userModal={},loading=false,userNotification={}}, 
   Auth:{user={},user:{roles=[]},  applicationDynamicConstants:{roleSource={}}} }= state;
   const currentUsrAccess =findTheAccess(roles);
    console.log("currentUsrAccess-->>" , currentUsrAccess);
  return { users ,userModal,userNotification, loading,  user,currentUsrAccess, roleSource};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
