import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import swal from 'sweetalert'

import * as channelActions from '../../redux/channel/actions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import { getLoggedInUser, findTheAccess } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';
import { v4 as uuidv4 } from 'uuid';
const resetNotification = { channelNotification: { notify: false, mode: 0, message: '' } };

class ChannelPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      newChannelModalData: {
        formData:
        {
          name: '',
          description: '',
          cphoto: ''
        }
      },

    };
    this.tableRef = React.createRef();
  }
  componentDidMount() {
    this.loadPageData();
    const { user: { id = '', companyID }, currentUsrAccess = 1 } = this.props;
    this.props.actions.loadCompanyListForChannel({ companyID, currentUsrAccess });
  }
  componentDidUpdate() {
    const { channelNotification: { notify = false, message = 'Success' } } = this.props;
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
      this.props.actions.resetChannelNotification(resetNotification);
    }
  }

  loadPageData = () => {  //this.state.departments.push()
    const { user: { id = '', companyID = '' }, currentUsrAccess } = this.props;
    this.props.actions.loadChannel({ id, currentUsrAccess, companyID });
  }
  handleChange = (event, field) => {

    const { newChannelModalData: { formData = {} } } = this.state;
    let proceddesData = {};

    if (event.target.name === 'companyId') {
      this.props.actions.loadDepartmentListForChannal({ companyID: event.target.value, currentUsrAccess: false });
      proceddesData[event.target.name] = event.target.value;
    } else {
      proceddesData[event.target.name] = event.target.value;
    }
    this.setState({ newChannelModalData: { formData: { ...formData, ...proceddesData } } });
  }
  handleFileChange = ({ id = "9dxverkvh", name = "postoffice (1).png", type = "image/png", data = '' }) => {
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(name)[1];

    const { newChannelModalData: { formData = {} } } = this.state;

    const imageStruc = {
      previewFile: undefined, "ImageBase64": data,
      "ImageFileExtensionIncludingDot": '.' + ext
    };
    this.setState({ newChannelModalData: { formData: { ...formData, ...imageStruc } } });
  }
  handleSubmit = () => {
    const { user: { id = '', companyID = '' }, channelModal: { mode = "edit" } } = this.props;
    const { newChannelModalData: { formData = {} } } = this.state;


    if (mode === 'edit') {
      const uptCHannelData = Object.assign({ ...formData }, { UserId: id });
      this.props.actions.updateChannel(uptCHannelData);
    } else {
      const newCHannelData = Object.assign({ ...formData }, { UserId: id, Id: uuidv4() });
      this.props.actions.newChannel(newCHannelData);
    }
    // this.props.actions.newChannel(newCHannelData);
  }
  toggleChannelModal = () => {
    const { channelModal: { show = false }, pageDropDown: { availableCompany = [] } } = this.props;
    const { newChannelModalData: { formData = {} } } = this.state;

    const togg = {
      channelModal: {
        show: !show,
        title: 'New Channel',
        mode: 'add',
        buttonText: 'Add Channel',
        formData: {
          name: '',
          description: '',
          companyId: ''
        }
      }
    };
    this.setState({
      newChannelModalData: {
        formData: {
          name: '',
          description: '',
          companyId: ''
        },
      }
    });
    this.props.actions.onclickModal(togg);
  }
  toggleEditChannelModal = (channel1, channel) => {
    const { channelModal: { show = false } } = this.props;
    const { companyId = '', name = "Demo1", description = "Demo 2", id = '',
      imageFullURL = '', imageURL = '', departmentId = '' } = channel;
    this.props.actions.loadDepartmentListForChannal({ companyID: companyId, currentUsrAccess: false });
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
    const togg = {
      channelModal: {
        show: !show,
        title: 'Edit Channel',
        mode: 'edit',
        buttonText: 'Update Channel',
        formData: {
          name,
          description,
          id,
          imageFullURL,
          imageURL,
          previewFile,
          companyId,
          departmentId
        },
      }
    };
    /* to save in loacal State */
    this.setState({
      newChannelModalData: {
        formData: {
          name,
          description,
          id,
          imageFullURL,
          imageURL,
          previewFile,
          companyId,
          departmentId
        },
      }
    });
    this.props.actions.onclickModal(togg);
  }
  deleteChannel = (event, channel) => {
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
          this.props.actions.deleteChannel({ UserID: id, ChannelID: channel.id });
          //this.loadPageData();
        } else {
          swal("Your Channel is safe!");
        }
      });
  }
  showChannelDetails = (eve, sjow) => {
    const { id = '' } = sjow;
    this.props.history.push('/shows/' + id)
  }
  handleFilterTextChange = (event, field) => {
    this.setState({filterText :event.target.value });
    if(event.target.value === ''){
      const { user: { id = '', companyID = '' }, currentUsrAccess } = this.props;
      const  filterText  = " "; 
      this.props.actions.searchChannel({ userId : id,currentUsrAccess,  companyID, filterText  })
    }
  }

  
  handleChannelSearch = (event, field) => {
    const { user: { id = '', companyID = '' }, currentUsrAccess } = this.props;
    const { filterText } = this.state;
    this.props.actions.searchChannel({ userId : id,currentUsrAccess,  companyID, filterText  });
  }
  render() {
    //const {newChannel:{name='', description='', cphoto=''}} = this.state;
    const { addNewUser = false, modalTitle, newChannelModalData = {} } = this.state;
    const { allProcessedChannels, channels = [], channelModal = {}, currentUsrAccess, user: { id = '', companyID = '' }, pageDropDown = {} } = this.props;

     console.log("THIS.props---", this.props);
    return (
      <React.Fragment>
        <Modal
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handlehide={this.toggleChannelModal}
          handleFileChange={this.handleFileChange}
          pageDropDown={pageDropDown}
          size="l"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          {...channelModal}
          {...newChannelModalData}
          currentUsrAccess={currentUsrAccess}

        />
        <div className="">

          { /* preloader */}
          {this.props.loading && <Loader />}
          <div class="row">
            <div class="col-12">
              <div class="row" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <div class="col-sm-8">
                  <h4 >Channels</h4>
                </div>
                <div class="col-sm-3">
                <div className="app-search">
                  <div className="app-search-box">
                    <div className="input-group">
                      <input type="search" className="form-control" 
                        onChange={(event)=> this.handleFilterTextChange(event)} 
                          placeholder="Search..." />
                      <div className="input-group-append custom-search">
                        <button className="btn" onClick={(event)=> this.handleChannelSearch(event)} >
                          <i className="fe-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                <div class="col-sm-1.5">
                  <div class="text-sm-right" >
                    <span href="#custom-modal" onClick={this.toggleChannelModal} class="btn btn-primary waves-effect waves-light"
                      data-animation="fadein" data-plugin="custommodal"
                      data-overlayColor="#38414a"><i class="mdi mdi-plus-circle mr-1">
                      </i> Add</span>
                  </div>

                </div>
              </div>

              {allProcessedChannels.map((cols) => (
                <Row className="row filterable-content">
                  {cols.map((col, indepos) => (
                    <Col className="col-sm-6 col-xl-3 filter-item all  ">
                      <div class="gal-box" style={{ height: "400px" }}>
                        <div class="gall-info" style={{ padding: " 15px 15px 0 15px" }}> <h4 class="font-14 mt-0">{col.name} </h4></div>
                        <div id="navigation">
                          <ul class="navigation-menu">

                            <li class="has-submenu" style={{ float: "right", marginTop: "-50px" }}>
                              <a href="#" style={{ color: "#000" }}>
                                <i class="mdi mdi-transit-connection"></i></a>
                              <ul class="submenu submenu-channel">
                                <span onClick={(colo) => this.toggleEditChannelModal(colo, col)} style={{ cursor: "pointer", padding: "0px !important" }}  >
                                  <i class="mdi mdi-square-edit-outline"></i> Edit
                                </span>
                                <br />
                                <span style={{ cursor: "pointer" }}
                                  onClick={(colo) => this.deleteChannel(colo, col)}>
                                  <i class="mdi mdi-delete"></i> Delete

                                </span>

                              </ul>
                            </li></ul></div>
                        <p style={{ paddingLeft: "15px" }}>{col.description.substring(0, 30)}</p>
                        <div style={{"textAlign": "center"}}>
                        <img src={col.imageFullURL} class="img-fluid img-w"  alt="work-thumbnail" />
                        </div>
                        <div class="gall-info">

                          <p>{col.description.substring(0, 100)}</p>
                          <p onClick={(colo) => this.showChannelDetails(colo, col)} style={{ cursor: "pointer", color: "#ff7a4c", fontSize: "12px", fontWeight: "bold" }}>See Shows</p>


                        </div>
                      </div>
                    </Col>



                  ))}
                </Row>
              ))}


            </div>
          </div>
          <Row>



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
            {/*  <Col lg={12}>
              <Card>
                <CardBody>
                  <h1>Channels List</h1>
                  <Button style={{ float: "right" }} variant="primary" onClick={this.toggleChannelModal}>
                    + New User        </Button>
                  <MaterialTable
                   tableRef={this.tableRef}
                    columns={[
                      { title: " Name", field: "name" },
                      { title: " Description", field: "description" },
                      {
                        title: "Image", field: "birthYear", type: "imageFullURL",
                        render: rowData => <img src={rowData.imageFullURL} style={{ width: 50, borderRadius: '50%' }} />
                      },

                    ]}
                    data={query =>
                      new Promise((resolve, reject) => {
                        let url = appSettings.API_ROUTE.MAIN_SITE;     
                         if(currentUsrAccess === 0){
                           url = url+'/api/Channels'   
                          let sera = query.search !== '' ? query.search : ' ';
                          let skp =  query.pageSize*query.page;
                          let take =  query.pageSize*query.page + query.pageSize;
                          url += '/'+sera+'/SkipTake/' +skp;                        
                          url += '/' + query.pageSize   
                         }else{
                           url =  url+'/api/Channels/ByCompany/'+companyID 
                           let sera = query.search !== '' ? query.search : ' ';
                           let skp =  query.pageSize*query.page;
                           let take =  query.pageSize*query.page + query.pageSize;
                           url += '/'+sera+'/' +skp;                        
                           url += '/' + query.pageSize  
                         }                      
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
                    title="Channels"
                    detailPanel={[

                      {
                        icon: 'play_circle_outline',
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
                        onClick: (event) => this.toggleChannelModal()
                      },
                      {
                        icon: 'edit',
                        tooltip: 'Edit Channel',
                        onClick: (event, rowData) => this.toggleEditChannelModal(rowData)
                      },
                      rowData => ({
                        icon: 'delete',
                        tooltip: 'Delete Channel',
                        onClick: (event, rowData) => this.deleteChannel(rowData),
                        disabled: rowData.birthYear < 2000
                      })
                    ]}
                    options={{
                      actionsColumnIndex: -1
                    }}
                  />

                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </div>


      </React.Fragment>
    )
  }
}



function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(channelActions, dispatch),
  };
}
const mapStateToProps = (state) => {
  var channelDemo = [], size = 4;

  const { ChannelPageReducer: { availableCompany = [], availableDepartment = [], loading = false, channels = [], channelModal = {},
    channelNotification = {} },
    Auth: { user = {}, user: { roles = [] } } } = state;
  const currentUsrAccess = findTheAccess(roles);

  let groupChannel = [];
  channels.map((epi, index) => {
    groupChannel.push(epi);
    if ((index + 1) % 4 === 0 || channels.length === index + 1) {
      channelDemo.push(groupChannel);
      groupChannel = [];
    }

  });

  return {
    channels, allProcessedChannels: channelDemo, user,
    channelModal, channelNotification, loading, currentUsrAccess,
    pageDropDown: { availableCompany, availableDepartment }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);