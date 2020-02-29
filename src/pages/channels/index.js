import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import swal from 'sweetalert'

import * as channelActions from '../../redux/channel/actions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import MaterialTable from "material-table";

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

import { v4 as uuidv4 } from 'uuid';
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
  }
  componentDidMount() {
    this.loadPageData();
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
    }
  }

  loadPageData = () => {  //this.state.departments.push()
    const { user: { id = '' } } = this.props;
    this.props.actions.loadChannel(id);
  }
  handleChange = (event, field) => {

    console.log("this.state", this.state);
    const { newChannelModalData: { formData = {} } } = this.state;
    let proceddesData = {};
    proceddesData[event.target.name] = event.target.value;
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
    const { user: { id = '' }, channelModal: { mode = "edit" } } = this.props;
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
    const { channelModal: { show = false } } = this.props;
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
        }
      }
    };
    this.setState({
      newChannelModalData: {
        formData: {
          name: '',
          description: '',
        },
      }
    });
    this.props.actions.onclickModal(togg);
  }
  toggleEditChannelModal = (channel) => {
    const { channelModal: { show = false } } = this.props;
    const { name = "Demo1", description = "Demo 2", id = '', imageFullURL = '', imageURL = '' } = channel;

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
          previewFile
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
          previewFile
        },
      }
    });
    this.props.actions.onclickModal(togg);
  }
  deleteChannel = (channel) => {
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
          this.loadPageData();
        } else {
          swal("Your Channel is safe!");
        }
      });


  }

  render() {
    //const {newChannel:{name='', description='', cphoto=''}} = this.state;
    const { addNewUser = false, modalTitle, newChannelModalData = {} } = this.state;
    const { channels = [], channelModal = {} } = this.props;
    return (
      <React.Fragment>
        <Modal
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handlehide={this.toggleChannelModal}
          handleFileChange={this.handleFileChange}
          size="l"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          {...channelModal}
          {...newChannelModalData}

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
                  <h1>Channels List</h1>
                  <Button style={{ float: "right" }} variant="primary" onClick={this.toggleChannelModal}>
                    + New User        </Button>
                  <MaterialTable
                    columns={[
                      { title: " Name", field: "name" },
                      { title: " Description", field: "description" },
                      {
                        title: "Image", field: "birthYear", type: "imageFullURL",
                        render: rowData => <img src={rowData.imageFullURL} style={{ width: 50, borderRadius: '50%' }} />
                      },

                    ]}
                    data={channels}
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
            </Col>
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


  const { ChannelPageReducer: { loading = false, channels = [], channelModal = {}, channelNotification = {} }, Auth: { user = {} } } = state;
  return { channels, user, channelModal, channelNotification, loading };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);