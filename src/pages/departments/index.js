import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { Table, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify';
import { notifyMe } from '../../helpers/applicationUtils';
import { v4 as uuidv4 } from 'uuid';
import * as departmentAction from '../../redux/department/actions';
import swal from 'sweetalert'
import { getLoggedInUser, findTheAccess } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

const resetNotification = { departmentNotification: { notify: false, mode: 0, message: '' } };
class DepartmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDepartmentModalData: {
        formData: {
          name: '',
          description: '',
          companyID: ''
        },
      }

    };
    this.tableRef = React.createRef();
  }
  componentDidUpdate() {

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
  componentDidMount() {
    this.loadPageData();
    const { user: { id = '', companyID }, currentUsrAccess } = this.props;
    //this.props.actions.loadCompanyListForUser({companyID, currentUsrAccess}); 
    this.props.actions.loadCompanyListForDepartment({ companyID, currentUsrAccess });
  }
  loadPageData = () => {  //this.state.departments.push()
    const { user: { CompanyID = '02790222-8153-44e0-b17b-0ff24a3f4d4d' }, currentUsrAccess } = this.props;
    this.props.actions.loadDepartemnt({ CompanyID, currentUsrAccess });
  }

  handleFileChange = ({ id = "9dxverkvh", name = "postoffice (1).png", type = "image/png", data = '' }) => {
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(name)[1];
    const { newDepartmentModalData: { formData = {} } } = this.state;
    const imageStruc = {
      previewFile: undefined, "ImageBase64": data,
      "ImageFileExtensionIncludingDot": '.' + ext
    };

    this.setState({ newDepartmentModalData: { formData: { ...formData, ...imageStruc } } });
  }

  handleChange = (event, field) => {
    const { newDepartmentModalData: { formData = {} } } = this.state;
    const { user: { id = '' } } = this.props;
    if (event.target.name === 'role') {
      formData['roleSelected'] = [event.target.value];
      formData['roles'] = [event.target.value];
    } else if (event.target.name === 'blocked') {
      if (event.target.checked) {
        formData[event.target.name] = null;
      } else {
        formData[event.target.name] = new Date();;
        formData['BlockedBy'] = id;
      }

    } else {

      formData[event.target.name] = event.target.value;
    }
    this.setState({ newDepartmentModalData: { formData: formData } });
  }

  handleSubmit = (event) => {
    const { user: { id = '' }, departmentModal: { mode = "edit" } } = this.props;
    const { newDepartmentModalData: { formData = {} } } = this.state;
    if (mode === 'edit') {
      const uptCHannelData = Object.assign({ ...formData }, { UserId: id });
      this.props.actions.updateDepartment(uptCHannelData);
    } else {
      const newUserData = Object.assign({ ...formData }, { UserId: id, Id: uuidv4() });

      this.props.actions.newDepartment(newUserData);
    }
  }

  toggleNewDepartmentModal = () => {
    const { departmentModal: { show = false }, pageDropDown: { roleSource = [], availableCompany = [] } } = this.props;
    const togg = {
      departmentModal: {
        show: !show,
        title: 'New User',
        mode: 'add',
        data: {
          name: '',
          description: '',
          companyID: ''
        },
        constants: { roleSource }
      }
    };


    this.setState({
      newDepartmentModalData: {
        formData: {
          name: '',
          description: '',
          companyID: ''
        },
      }
    });


    this.props.actions.onclickModal(togg);
  }
  toggleEditDepartmentModal = (event, user) => {
    const { departmentModal: { show = false }, pageDropDown: { roleSource = [] } } = this.props;
    const { name = '',
      description = '',
      companyId = '', id = '', imageFullURL = '', imageURL = '', } = user;
    const togg = {
      departmentModal: {
        show: !show,
        title: 'Edit Department',
        mode: 'edit',
        data: {
          name,
          description,
          companyID: companyId,
          departmentId: id,
          imageFullURL,
          imageURL,

        }
      }
    };


    /* to save in loacal State */
    this.setState({
      newDepartmentModalData: {
        formData: {
          name,
          description,
          companyID: companyId,
          departmentId: id,
          imageFullURL,
          imageURL,

        }
      }
    });
    this.props.actions.onclickModal(togg);
  }
  deleteDepartment = (event, dept) => {
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
          swal("Your Department is safe!");
        }
      });
  }

  handleFilterTextChange = (event, field) => {
    this.setState({ filterText: event.target.value });
    if (event.target.value === '') {
      const { user: { id = '', companyID = '' }, currentUsrAccess } = this.props;
      const filterText = " ";
      this.props.actions.searchDepartment({ userId: id, currentUsrAccess, companyID, filterText })
    }

  }


  handleDepartmentChange = (event, field) => {
    this.setState({ filterText: event.target.value });
    if (event.target.value === '') {
      const { user: { id = '', companyID = '' }, currentUsrAccess } = this.props;
      const filterText = " ";
      this.props.actions.searchDepartment({ userId: id, currentUsrAccess, companyID, filterText })
    }

  }


  handleSearch = (event, field) => {
    const { user: { id = '', companyID = '' }, currentUsrAccess } = this.props;
    const { filterText } = this.state;
    const channelId = this.props.match.params.id;

    

    this.props.actions.searchDepartment({ userId: id, currentUsrAccess, companyID, filterText, channelId });
  }
  render() {
    const { newDepartmentModalData } = this.state;
    const { allProcessedDepartment = [], users = [],
      departmentModal = {}, currentUsrAccess, user: { id = '', companyID = '' },
      pageDropDown = {}, pageDropDown: { availableCompany = [] } } = this.props;

    return (
      <React.Fragment>

        <Modal
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleFileChange={this.handleFileChange}
          handlehide={this.toggleNewDepartmentModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          {...departmentModal}
          {...newDepartmentModalData}
          currentUsrAccess={currentUsrAccess}
          pageDropDown={pageDropDown}

        />
        <div className="">
          {this.props.loading && <Loader />}
          <Row >
            <div class="col-sm-8" >
              <div class="page-title-box">
                <h4 class="page-title">Departments</h4>
              </div>
            </div>
            <div class="col-sm-3">
              <div className="app-search text-sm-right custom-top">
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
                <span href="#custom-modal" onClick={this.toggleNewDepartmentModal} class="btn btn-primary waves-effect waves-light"
                  data-animation="fadein" data-plugin="custommodal"
                  data-overlayColor="#38414a"><i class="mdi mdi-plus-circle mr-1">
                  </i> Add</span>

              </div>
            </div>

          </Row>


          {allProcessedDepartment.map((cols) => (
              <Row className="row filterable-content">
              {cols.map((col, indepos) => (

              <Col className="col-sm-6 col-xl-3 filter-item all  ">
                  <div class="gal-box" style={{ height: "350px" }}>
                  <div class="gall-info" style={{ padding: " 15px 15px 0 15px" }}> <h4 class="font-14 mt-0">{col.name} </h4></div>
                  <div id="navigation">
                    <ul class="navigation-menu">
                      <li class="has-submenu" style={{ float: "right", marginTop: "-50px" }}>
                        <a href="#" style={{ color: "#000" }}>
                          <i class="mdi mdi-transit-connection"></i></a>
                        <ul class="submenu submenu-channel">
                          <span onClick={(colo) => this.toggleEditDepartmentModal(colo, col)} 
                          style={{ cursor: "pointer", padding: "0px !important" }}  >
                            <i class="mdi mdi-square-edit-outline"></i> Edit
                                </span>
                          <br />
                          <span style={{ cursor: "pointer" }}
                            onClick={(colo) => this.deleteDepartment(colo, col)}>
                            <i class="mdi mdi-delete"></i> Delete
                          </span>
                        </ul>
                      </li></ul>

                  </div>
                  <div style={{"textAlign": "center"}}>
                  <img class="card-img-top img-fluid img-w" src={`${col.imageFullURL}?${Date.now()}`} alt="Card image cap" />
                  </div>
                  <div class="card-body" style={{ padding: "1rem"}}>

                    <p class="card-text">{col.description}</p>

                  </div>
                  </div>
                </Col>






              ))}
             </Row>
          ))}



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

  const {
    DepartmentPageReducer: { departments = [], availableCompany = [], users = [], departmentModal = {},
      loading = false, departmentNotification = {} },
    Auth: { user = {}, user: { roles = [] },
      applicationDynamicConstants: { roleSource = {} } } } = state;
  const currentUsrAccess = findTheAccess(roles);


  var departmentDemo = [], size = 4;
  let groupDepartment = [];
  departments.map((epi, index) => {
    groupDepartment.push(epi);
    if ((index + 1) % 4 === 0 || departments.length === index + 1) {
      departmentDemo.push(groupDepartment);
      groupDepartment = [];
    }

  });


  return { loading, allProcessedDepartment: departmentDemo, departments, users, departmentModal, departmentNotification, loading, user, currentUsrAccess, pageDropDown: { availableCompany, roleSource } };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentPage);
