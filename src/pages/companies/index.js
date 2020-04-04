import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import swal from 'sweetalert'

import * as companyActions from '../../redux/company/actions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import MaterialTable from "material-table";

import { getLoggedInUser, findTheAccess } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

import { v4 as uuidv4 } from 'uuid';
const resetNotification = { companyNotification: { notify: false, mode: 0, message: '' } };
class CompanyPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: getLoggedInUser(),

      newCompanyModalData: {
        formData:
        {
          name: '',
          description: '',
          cphoto: '',
          address: '', contact1: '', contact2: '', details: '',
        }
      },

    };
    this.tableRef = React.createRef();
  }
  componentDidMount() {
    console.log("DOICIC");
    //this.tableRef.current.onQueryChange('show');
    // this.loadPageData();
  }
  componentDidUpdate() {

    const { companyNotification: { notify = false, message = 'Success' } } = this.props;
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
      this.props.actions.resetCompanyNotification(resetNotification);
      this.tableRef.current.onQueryChange()
    }
  }

  loadPageData = () => {  //this.state.departments.push()
    const { user: { id = '' } } = this.props;
    this.props.actions.loadCompany(id);
  }
  handleChange = (event, field) => {
    const { newCompanyModalData: { formData = {} } } = this.state;
    let proceddesData = {};
    proceddesData[event.target.name] = event.target.value;
    this.setState({ newCompanyModalData: { formData: { ...formData, ...proceddesData } } });
  }
  handleFileChange = ({ id = "9dxverkvh", name = "postoffice (1).png", type = "image/png", data = '' }) => {
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(name)[1];
    const { newCompanyModalData: { formData = {} } } = this.state;
    const imageStruc = {
      previewFile: undefined, "ImageBase64": data,
      "ImageFileExtensionIncludingDot": '.' + ext
    };
    this.setState({ newCompanyModalData: { formData: { ...formData, ...imageStruc } } });
  }
  handleSubmit = () => {
    const { user: { id = '' }, companyModal: { mode = "edit" } } = this.props;
    const { newCompanyModalData: { formData = {} } } = this.state;
    if (mode === 'edit') {
      const uptCHannelData = Object.assign({ ...formData }, { UserId: id });
      this.props.actions.updateCompany(uptCHannelData);
    } else {
      const newCHannelData = Object.assign({ ...formData }, { UserId: id, Id: uuidv4() });
      this.props.actions.newCompany(newCHannelData);
    }
    // this.props.actions.newCompany(newCHannelData);
  }
  toggleCompanyModal = () => {
    const { companyModal: { show = false } } = this.props;
    const { newCompanyModalData: { formData = {} } } = this.state;
    const togg = {
      companyModal: {
        show: !show,
        title: 'New Company',
        mode: 'add',
        buttonText: 'Add Company',
        formData: {
          companyName: '',
          address: '', contact1: '', contact2: '', details: '',
        }
      }
    };
    this.setState({
      newCompanyModalData: {
        formData: {
          companyName: '',
          address: '', contact1: '', contact2: '', details: '',
        },
      }
    });
    this.props.actions.onclickModal(togg);
  }
  toggleEditCompanyModal = (company) => {
    const { companyModal: { show = false } } = this.props;
    const { id = '',
      companyName = '', address = '', contact1 = '', contact2 = '', details = '' } = company;
    const togg = {
      companyModal: {
        show: !show,
        title: 'Edit Company',
        mode: 'edit',
        buttonText: 'Update Company',
        formData: {


          id,
          address, contact1, contact2, details,
        },
      }
    };
    /* to save in loacal State */
    this.setState({
      newCompanyModalData: {
        formData: {
          id, companyName, address, contact1, contact2, details,
        },
      }
    });
    this.props.actions.onclickModal(togg);
  }
  deleteCompany = (event, company) => {

    const { user: { id = '' } } = this.props;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Company file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          //console.log("company---", company,id );
          this.props.actions.deleteCompany({ UserID: id, CompanyID: company.id });
          this.loadPageData();
        } else {
          swal("Your Company is safe!");
        }
      });


  }
  handleCompanyChange = (event, field) => {
    this.setState({ filterText: event.target.value });
    if (event.target.value === '') {
      const { user: { id = '', companyID = '' }, currentUsrAccess } = this.props;
      const filterText = " ";
      // this.props.actions.searchCompany({ userId : id,currentUsrAccess,  companyID, filterText  })
    }

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
    //const {newCompany:{name='', description='', cphoto=''}} = this.state;
    const { addNewUser = false, modalTitle, newCompanyModalData = {} } = this.state;

    const { companies = [], companyModal = {}, currentUsrAccess, filterText } = this.props;

    console
      .log("Props filterText---", filterText);
    return (
      <React.Fragment>
        <Modal
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handlehide={this.toggleCompanyModal}
          handleFileChange={this.handleFileChange}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          {...companyModal}
          {...newCompanyModalData}

        />
        <div className="">
          { /* preloader */}
          {this.props.loading && <Loader />}
          <Row>
          <div class="col-sm-8" >
              <div class="page-title-box">
                <h4 class="page-title">Companies</h4>
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
                <span href="#custom-modal" onClick={this.toggleCompanyModal} class="btn btn-primary waves-effect waves-light"
                  data-animation="fadein" data-plugin="custommodal"
                  data-overlayColor="#38414a"><i class="mdi mdi-plus-circle mr-1">
                  </i> Add</span>

              </div>
            </div>



          </Row>
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

                  <MaterialTable
                    tableRef={this.tableRef}

                    columns={[
                      { title: "Company Name", field: "companyName" },
                      { title: "Address", field: "address" },
                      { title: "City", field: "contact1" },
                      { title: "State", field: "contact1" },
                      { title: "Zip", field: "contact1" },
                      { title: "Country", field: "contact1" },
                      { title: "Time Zone", field: "contact1" }



                    ]}
                    data={query =>
                      new Promise((resolve, reject) => {
                        let url = 'https://casty.azurewebsites.net/api/Companies/Full/'
                        if (currentUsrAccess === 0) {
                          url = 'https://casty.azurewebsites.net/api/Companies/Full/'
                          let sera = query.search !== '' ? query.search : filterText !== '' ? filterText : " ";
                          let skp = query.pageSize * query.page;
                          let take = query.pageSize * query.page + query.pageSize;
                          url += sera + '/SkipTake/' + skp;
                          url += '/' + query.pageSize
                        }

                        fetch(url)
                          .then(response => response.json())
                          .then(result => {
                            resolve({
                              data: result.data,
                              page: result.page - 1,
                              totalCount: result.totalRecords,
                              per_page: query.pageSize,
                              "page": result.pageNumber - 1,
                            });
                          })
                      })
                    }
                    // title="Companies"
                    // detailPanel={[

                    //   {
                    //     icon: 'play_circle_outline',
                    //     tooltip: 'Show Surname',
                    //     render: rowData => {
                    //       return (
                    //         <div
                    //           style={{
                    //             fontSize: 50,
                    //             textAlign: 'center',
                    //             color: 'white',
                    //             backgroundColor: '#6c757d',
                    //           }}
                    //         >
                    //           {rowData.name}
                    //         </div>
                    //       )
                    //     },
                    //   }
                    // ]}
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
                              <a href="#" style={{ color: "#000" }}>
                                <i class="mdi mdi-transit-connection"></i></a>
                              <ul class="submenu">
                                <li onClick={(event) => props.action.onClick(event, props.data)}>
                                  Edit
                                    </li>
                                <li onClick={(event) => this.deleteCompany(event, props.data)}>
                                  Delete
                                    </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      ),
                    }}
                    /*   icons={{
                        Search : ""
                      }} */
                    options={{
                      loadingType: 'overlay',
                      maxBodyHeight: 'auto',
                      search: false,
                      searchFieldStyle: { border: "1px solid #ced4da" },
                      searchFieldAlignment: 'left',
                      showTitle: false,
                      tableLayout: "auto",
                      pageSize: 10,
                      actionsColumnIndex: -1,
                      rowStyle: rowData => ({
                        backgroundColor: (rowData.tableData.id % 2 == 0) ? '#f1f5f7' : '#FFF'
                      }),
                      headerStyle: {
                        color: "#aebbc5",
                        fontSize: "13px",
                        fontWeight: "bold"
                      },

                      title: false
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
    actions: bindActionCreators(companyActions, dispatch),
  };
}
const mapStateToProps = (state) => {

  console.log("state---", state);


  const { CompanyPageReducer: { filterText = '', loading = false, companies = [], companyModal = {},
    companyNotification = {} },
    Auth: { user = {}, user: { roles = [] } } } = state;
  const currentUsrAccess = findTheAccess(roles);
  return { filterText, companies, user, companyModal, companyNotification, loading, currentUsrAccess };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);