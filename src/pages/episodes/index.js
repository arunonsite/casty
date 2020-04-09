import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import swal from 'sweetalert'

import * as episodeActions from '../../redux/episode/actions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import { getLoggedInUser } from '../../helpers/authUtils';
import { formatDate } from '../../helpers/applicationUtils';
import Loader from '../../components/Loader';
import BreadCrumb from '../../components/BreadCrumb';
import Modal from './popup/Modal';
import Player from './popup/Player';
import { Redirect, Link } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid';
class EpisodePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      newEpisodeModalData: {
        formData:
        {
          name: '',
          description: '',

        }
      },
      playerModal: {
        show: false,
        title: 'New Episode',
        mode: 'add',
        buttonText: 'Add Episode',
        
      }

    };

  }
  componentDidMount() {
    this.loadPageData();
  }
  componentDidUpdate() {
    const { episodeNotification: { notify = false, message = 'Success' } } = this.props;
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
    const { user: { id = '', companyID = '' }, currentUsrAccess } = this.props;

    const showId = this.props.match.params.id;

    this.props.actions.loadEpisode({ id, showId });

  }
  handleChange = (event, field) => {


    const { newEpisodeModalData: { formData = {} } } = this.state;
    let proceddesData = {};
    proceddesData[event.target.name] = event.target.value;
    this.setState({ newEpisodeModalData: { formData: { ...formData, ...proceddesData } } });
  }
  handleFileChange = ({ id = "9dxverkvh", name = "postoffice (1).png", type = "image/png", data = '' }) => {
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(name)[1];

    const { newEpisodeModalData: { formData = {} } } = this.state;

    const imageStruc = {
      previewFile: undefined, "ImageBase64": data,
      "ImageFileExtensionIncludingDot": '.' + ext
    };
    this.setState({ newEpisodeModalData: { formData: { ...formData, ...imageStruc } } });
  }
  handleSubmit = () => {
    const { user: { id = '' }, episodeModal: { mode = "edit" } } = this.props;
    const { newEpisodeModalData: { formData = {} } } = this.state;
    if (mode === 'edit') {
      const uptCHannelData = Object.assign({ ...formData }, { ShowId: this.props.match.params.id, UserId: id });
      this.props.actions.updateEpisode(uptCHannelData);
    } else {
      const newCHannelData = Object.assign({ ...formData }, { ShowId: this.props.match.params.id, UserId: id, Id: uuidv4() });
      this.props.actions.newEpisode(newCHannelData);
    }
    // this.props.actions.newEpisode(newCHannelData);
  }
  toggleEpisodeModal = () => {
    const { episodeModal: { show = false } } = this.props;
    const { newEpisodeModalData: { formData = {} } } = this.state;

    const togg = {
      episodeModal: {
        show: !show,
        title: 'New Episode',
        mode: 'add',
        buttonText: 'Add Episode',
        formData: {
          name: '',
          description: '',
        }
      }
    };
    this.setState({
      newEpisodeModalData: {
        formData: {
          name: '',
          description: '',
        },
      }
    });
    this.props.actions.onclickModal(togg);
  }
  toggleEditEpisodeModal = (episodeId, indepos) => {

    const { episodeModal: { show = false }, episodes = [] } = this.props;
    let episode = episodes.filter(episode => {
      return episode.id === episodeId;
    });
    const { name = "Demo1", description = "Demo 2", id = '' } = episode[0];
    const togg = {
      episodeModal: {
        show: !show,
        title: 'Edit Episode',
        mode: 'edit',
        buttonText: 'Update Episode',
        formData: {
          name,
          description,
          id
        },
      }
    };
    /* to save in loacal State */
    this.setState({
      newEpisodeModalData: {
        formData: {
          name,
          description,
          id
        },
      }
    });
    this.props.actions.onclickModal(togg);
  }
  deleteEpisode = (episodeId) => {
    const { episodeModal: { show = false }, episodes = [], user: { id = '' } } = this.props;
    let episode = episodes.filter(episode => {
      return episode.id === episodeId;
    });
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Episode file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.actions.deleteEpisode({ UserID: id, EpisodeID: episodeId });
          this.loadPageData();
        } else {
          swal("Your Episode is safe!");
        }
      });


  }

  navigatePage = (page) => {
    return <Redirect to={page} />
  }

  handleEpisodeSearch = (event, field) => {
    const { user: { id = '' } } = this.props;
    const showId = this.props.match.params.id;
    let episodeFilter = event.target.value;
    this.props.actions.searchEpisode({ showId, episodeFilter });
  }

  togglePlayerModal = () => {
    const { playerModal: { show = false } } = this.state;
    this.setState({
      playerModal: {
        show: !show,
        title: 'New Episode',
        mode: 'add',
        buttonText: 'Add Episode',
        
      }
    });
    //this.props.actions.onclickModal(togg);
  }

  render() {

    //match.params.id
    //const {newEpisode:{name='', description='', cphoto=''}} = this.state;
    const { addNewUser = false, modalTitle, newEpisodeModalData = {}, playerModal ={} } = this.state;
    const { episodes = [], episodeModal = {}, allProcessedEpisods = [] } = this.props;



    const BreadCrumbList = [
      { name: 'Home', link: 'dashboard' },
      { name: 'Channels', link: 'Channels' },
      { name: 'Shows', link: '/Shows' },
      { name: 'Episodes', link: 'Episodes' },
    ];


    return (

      <React.Fragment>
        <Modal
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handlehide={this.toggleEpisodeModal}
          handleFileChange={this.handleFileChange}          
          aria-labelledby="contained-modal-title-vcenter"
          centered
          {...episodeModal}
          {...newEpisodeModalData}
        />
    <Player
          handlehide={this.togglePlayerModal}
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          {...playerModal}
        />
        {this.props.loading && <Loader />}
        <div class="row">
          <div class="col-12">
            <div class="page-title-box">
              {/*  <div class="page-title-right">
                          <BreadCrumb list={BreadCrumbList} navigatePage={this.navigatePage}/>
                          </div> */}
              <h4 class="page-title">Episodes</h4>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12 order-xl-1 order-2">
            <div class="card mb-2" style={{ backgroundColor: "#F4F5F9" }}>
              <div class="card-body" >
                <div class="row" style={{ marginRight: '-30px', marginLeft: '-30px' }} >
                  <div class="col-lg-2">
                    <form class="form-inline">
                      <div class="form-group">
                        <label for="inputPassword2" class="sr-only">Search</label>
                        <input type="search" onChange={this.handleEpisodeSearch} class="form-control" id="inputPassword2" placeholder="Search..." />
                      </div>
                    </form>
                  </div>
                  {/* <div class="col-sm-2">
                    <div class="form-group">
                      <select id="inputState" class="form-control">
                        <option>Date Added</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select>

                    </div>
                  </div>
                  <div class="col-sm-2">
                    <div class="form-group">
                      <select id="inputState" class="form-control">
                        <option>By Category</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select>
                    </div>
                  </div> */}
                  <div class="col-sm-10">
                    <div class="text-sm-right">
                      <button onClick={this.toggleEpisodeModal} type="button" class="btn btn-primary waves-effect waves-light mr-1"><i class="mdi mdi-plus-circle mr-1"></i>Upload Episodes</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <div class="row align-items-center">
                <div class="col-sm-6 text-center card-title-section" style={{ paddingRight: "250px" }}>Title</div>
                <div class="col-sm-2 text-center card-title-section">Duration</div>
                <div class="col-sm-2 text-center card-title-section">Date Added</div>
                <div class="col-sm-2 text-center card-title-section">Action</div>
              </div>
            </div>
            {episodes.map((cols  ) => (
            <div class="card-box mb-2">
              <div class="row align-items-center">
                <div class="col-sm-6">
                  <div class="media">
                      <span class="video" style= {{cursor: "pointer"}} onClick={this.togglePlayerModal}> 
                      <img id="play" class="play d-flex align-self-center mr-3"
                       src="https://casty.azurewebsites.net/images/Channels/383fdfa7-a91e-4ce9-888d-962446738786.jpg" 
                       alt="Generic placeholder image" height="94" />  
                     </span>
                      <div class="media-body" >
                      <p class="mb-1">Episodes #34</p>
            <h4 class="mt-0 mb-2 font-16">{cols.name}</h4>
            <p class="mb-0">{cols.description}</p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-2">
                  <div class="text-center button-list">
            <p class="mb-0 text-muted">{Math.floor(cols.durationInSeconds / 60) + ':' + ('0' + Math.floor(cols.durationInSeconds % 60)).slice(-2)}</p>

                  </div>
                </div>
                <div class="col-sm-2">
                  <div class="text-center my-3 my-sm-0">
            <p class="mb-0 text-muted">{formatDate(cols.created)}</p>
                  </div>
                </div>

                <div class="col-sm-2">
                  <div class="text-center button-list">
                  <span onClick={() => this.toggleEditEpisodeModal(cols.id)} class="btn btn-light waves-effect waves-light custon-btn">Edit</span>
                  <span onClick={() => this.deleteEpisode(cols.id)} class="btn btn-light waves-effect waves-light custon-btn">Delete</span>
                  </div>
                </div>
              </div>
            </div>
          ))};
          </div>
        </div>
        <div class="wrapper">
          <div class="container-fluid">
            {allProcessedEpisods.map((cols) => (
              <Row>
                {cols.map((col, indepos) => (
                  <Col lg={4} md={4}>
                    <div class="card-box bg-pattern  ribbon-box">
                      <div class="ribbon  ribbon-secondary  float-right" /* style={{ "background": '#DBDBDB'}} */>
                        <span onClick={() => this.toggleEditEpisodeModal(col.id)} class="ribbon-warning"
                          style={{ "padding": '4px 3px 3px 10px', "margin": "0px 7px 0px 0px" }}> 
                          <i class="mdi   mdi-pencil mr-1"></i> 
                        </span>
                        <span onClick={() => this.deleteEpisode(col.id)} class="ribbon-danger" style={{ "padding": '4px 3px 3px 10px' }}><i class="mdi mdi-close mr-1"></i> </span>
                      </div>
                      <div class="card2">
                        <div class="card-box2">
                          <h4 class="header-title">{col.name}</h4>
                          <p class="sub-header">Episode Number <code>{col.number}</code></p>
                          <div class="card">
                            <div class="card-box" style={{ "marginBottom": "0px" }}>
                              <div class="text-center  card-img-top img-fluid embed-responsive embed-responsive-21by9" >
                                {/*  <iframe class="embed-responsive-item"
                               src="https://www.youtube.com/embed/PrU
                               xWZiQfy4?autohide=0&showinfo=0&controls=0"></iframe> */}
                                <img class="embed-responsive-item" src='https://www.upsidelearning.com/blog/wp-content/uploads/2012/10/return-of-video-to-elearning.jpg' />
                              </div>
                            </div>
                          </div>
                          <div class="text-center">
                            {/*  <img src="assets/images/companies/amazon.png" 
                                alt="logo" class="avatar-xl rounded-circle mb-3" /> */}
                            <h4 class="mb-1 font-20">Amazon Inc.</h4>
                            <p class="text-muted  font-14">Seattle, Washington</p>
                          </div>
                          <p class="font-14 text-center text-muted">
                            {col.description}
                          </p>
                          <div class="row mt-4 text-center">
                            <div class="col-6">
                              <a href="javascript:void(0);" class="btn btn-sm btn-light">Rating</a>
                              <h4></h4>
                            </div>
                            <div class="col-6">
                              <a href="javascript:void(0);" class="btn btn-sm btn-light">Number</a>
                              <h4>{col.number}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            ))}
          </div>
        </div>


      </React.Fragment>)
  }
}



function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(episodeActions, dispatch),
  };
}
const mapStateToProps = (state) => {
  var episodesDemo = [], size = 3;

  const { EpisodePageReducer: { loading = false, episodeModal = {}, episodes = [], episodeNotification = {} }, Auth: { user = {} } } = state;


  return { episodes,  user, episodeModal, episodeNotification, loading };
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodePage);