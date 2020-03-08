import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Row, Col } from 'reactstrap';
import swal from 'sweetalert'

import * as episodeActions from '../../redux/episode/actions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import BreadCrumb from '../../components/BreadCrumb';
import Modal from './popup/Modal';
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
    const { user: { id = '' ,companyID=''}, currentUsrAccess } = this.props;
    
    const showId = this.props.match.params.id;
  
    this.props.actions.loadEpisode({id, showId});
  
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
      const uptCHannelData = Object.assign({ ...formData }, {ShowId:this.props.match.params.id,  UserId: id });
      this.props.actions.updateEpisode(uptCHannelData);
    } else {
      const newCHannelData = Object.assign({ ...formData }, { ShowId:this.props.match.params.id,  UserId: id, Id: uuidv4() });
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

  const { episodeModal: { show = false },episodes=[]  } = this.props;
    let episode = episodes.filter(episode => {
      return episode.id === episodeId ;
  });
  console.log("pos={indepos}-episode-", episode);
    const { name = "Demo1", description = "Demo 2", id = ''} = episode[0];
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
    const { episodeModal: { show = false },episodes=[] , user: { id = '' }  } = this.props;
    let episode = episodes.filter(episode => {
      return episode.id === episodeId ;
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

    
 

   this.props.actions.searchEpisode({showId, episodeFilter});


/* 
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
    this.props.actions.onclickModal(togg); */

  }

  render() {

    //match.params.id
    //const {newEpisode:{name='', description='', cphoto=''}} = this.state;
    const { addNewUser = false, modalTitle, newEpisodeModalData = {} } = this.state;
    const { episodes = [], episodeModal = {},  allProcessedEpisods=[] } = this.props;

    

     const BreadCrumbList = [
       {name:'Home', link:'dashboard'},
       {name:'Channels', link:'Channels'},
       {name:'Shows', link:'/Shows'},
       {name:'Episodes', link:'Episodes'},
      ];
      
   
    return (
   
      <React.Fragment>
        <Modal
          handleSubmit={this.handleSubmit}    
          handleChange={this.handleChange}          
          handlehide={this.toggleEpisodeModal}    
          handleFileChange={this.handleFileChange}     
          size="l"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        
          {...episodeModal}
          {...newEpisodeModalData}
        />
         {this.props.loading && <Loader />}
      <div class="wrapper">
          <div class="container-fluid">
               
          <div class="row">
                  <div class="col-12">
                      <div class="page-title-box">
                          <div class="page-title-right">
                          <BreadCrumb list={BreadCrumbList} navigatePage={this.navigatePage}/>
                          </div>
                          <h4 class="page-title">ShowName -Episodes</h4>
                      </div>
                  </div>
            </div>     
      
              <div class="row">
                  <div class="col-12">
                      <div class="card-box">
                          <div class="row">
                              <div class="col-lg-8">
                                  <form class="form-inline">
                                      <div class="form-group">
                                          <label for="inputPassword2" class="sr-only">Search</label>
                                          <input type="search" onChange={this.handleEpisodeSearch} class="form-control" id="inputPassword2" placeholder="Search..." />
                                      </div>
                                  </form>
                              </div>
                              <div class="col-lg-4">
                                  <div class="text-lg-right mt-3 mt-lg-0">
                                      <button onClick={this.toggleEpisodeModal} type="button" class="btn btn-warning waves-effect waves-light mr-1"><i class="mdi mdi-plus-circle mr-1"></i> Add New</button>
                                  </div>
                              </div>
                          </div> 
                      </div> 
                  </div>
              </div>
          
         
                  {allProcessedEpisods.map((cols  ) => (
              <Row>
                 {cols.map((col,indepos) => ( 
                  <Col lg={4} md={4}> 
                        <div class="card-box bg-pattern  ribbon-box">{/* 
                        <div class="ribbon-two ribbon-two-secondary"><span>Secondary</span></div> */}
                       {/*  <div class="card-widgets">
                                    <a href="javascript:;" data-toggle="reload"><i class="mdi mdi-refresh"></i></a>
                                    <a data-toggle="collapse" href="#cardCollpase2" role="button" 
                                    aria-expanded="false" aria-controls="cardCollpase2"><i class="mdi mdi-minus"></i></a>
                                    <a href="#" data-toggle="remove"><i class="mdi mdi-close"></i></a>
                                </div> */}
                        
                          <div class="ribbon  ribbon-secondary  float-right" /* style={{ "background": '#DBDBDB'}} */>
                         <span  onClick = {()=>this.toggleEditEpisodeModal(col.id)}  class="ribbon-warning" 
                         style={{"padding" : '4px 3px 3px 10px',"margin": "0px 7px 0px 0px"}}> <i class="mdi   mdi-pencil mr-1"></i>  </span>
                         <span  onClick = {()=>this.deleteEpisode(col.id)}  class="ribbon-danger" style={{"padding" : '4px 3px 3px 10px'}}><i class="mdi mdi-close mr-1"></i> </span>
                          </div>
                        <div class="card2">
                      <div class="card-box2">
                <h4 class="header-title">{col.name}</h4>
                <p class="sub-header">Episode Number <code>{col.number}</code></p>
                <div class="card">
                      <div class="card-box" style={{"marginBottom": "0px"}}> 
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
                             

                             
                           {/*  <div class="row mt-4 text-center">
                                <div class="col-6">
                                <button type="button"   class="btn btn-danger waves-effect waves-light"><i class="mdi mdi-close"></i>Delete</button>
                                </div>
                                <div class="col-6">
                                <button type="button" class="btn btn-blue waves-effect waves-light"><i class="mdi mdi-pencil"></i>Edit</button>
                                </div>
                            </div> */}
                            
                            
                            </div>

                            
                      </div>
                        </div>  
                  
                     {/*  <div class="card">
                      <div class="card-box">
                <h4 class="header-title">{col.name}</h4>
                <p class="sub-header">Episode Number <code>{col.number}</code></p>
                          <div class=" card-img-top img-fluid embed-responsive embed-responsive-21by9">
                         
                               <img class="embed-responsive-item" src='https://www.upsidelearning.com/blog/wp-content/uploads/2012/10/return-of-video-to-elearning.jpg' />
                          </div>
                          <div class="card-body">
                              <h5 class="card-title">Details</h5>
                <p class="card-text">{col.description}</p>
                              <a href="javascript:void(0);" class="btn btn-primary waves-effect waves-light">Button</a>
                          </div>
                          </div>
                      </div>  */}
                     
                      </Col>
               ))} 
              </Row>
            ))} 
          </div> 
      </div>
      
      
      </React.Fragment>   )
  }
}



function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(episodeActions, dispatch),
  };
}
const mapStateToProps = (state) => {
  var episodesDemo = [], size = 3;

  const { EpisodePageReducer: { loading = false, episodeModal = {},episodes = [], episodeNotification = {} }, Auth: { user = {} } } = state;

  let episodeList = [{
    name:'	How to Sell -1',
    number :'1',
    desc : "A Channel Description (also known as a “YouTube About Page”) is a brief outline of what type of content you publish on your channel. It appears on your Channel Page and in YouTube's search results. ... And a well-written Channel Description can also convert visitors into subscribers.",
    show :"Demo",
    image : 'https://m.media-amazon.com/images/M/MV5BMjA5NzA5NjMwNl5BMl5BanBnXkFtZTgwNjg2OTk2NzM@._V1_QL50_SY1000_CR0,0,674,1000_AL_.jpg'
  },{
    name:'	How to Sell -2',
    number :'2',
    desc : "A Channel Description (also known as a “YouTube About Page”) is a brief outline of what type of content you publish on your channel. It appears on your Channel Page and in YouTube's search results. ... And a well-written Channel Description can also convert visitors into subscribers.",
    show :"Demo",
    image : 'https://www.golegal.co.za/wp-content/uploads/2019/04/Game-of-Thrones.png'
  },{
    name:'	How to Sell -3',
    number :'3',
    desc : "A Channel Description (also known as a “YouTube About Page”) is a brief outline of what type of content you publish on your channel. It appears on your Channel Page and in YouTube's search results. ... And a well-written Channel Description can also convert visitors into subscribers.",
    show :"Demo",
    image : 'https://cdn.siasat.com/wp-content/uploads/2019/04/Got_ANI.jpg'
  },{
    name:'	How to Sell -4',
    number :'4',
    desc : "Episode 1. How To Sell Description",
    show :"Demo",
    image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz6NE0xXnU0IRosgBdEYzK7IMiAOquBVZtfRaiPbMDNmlQb0Ux&s'
  },{
    name:'	How to Sell -5',
    number :'5',
    desc : "Episode 1. How To Sell Description",
    show :"Demo",
    image : 'https://i.ytimg.com/vi/rlR4PJn8b8I/maxresdefault.jpg'
  }
];
 //http://localhost:3000/episodes/02edf7a0-3c61-4b4c-a63c-c10abc88dae9
//episodeList = [...episodes].concat(episodeList);
  
/*   console.log("state---1", state);
while (allProcessEpisods.length > 0)
episodesDemo.push(allProcessEpisods.splice(0, size)); */
/* 
let allProcessedEpisods=[];
while (allProcessEpisods.length > 0)
allProcessedEpisods.push(allProcessEpisods.splice(0, 3)); */

let groupEpisode =[];
 console.log("episodes--", state, episodes.length);
episodes.map((epi, index)=>{
  groupEpisode.push(epi);
  if((index+1)%3 === 0 || episodes.length === index+1){
    episodesDemo.push(groupEpisode);
    groupEpisode=[];
  }

});

  return { episodes , allProcessedEpisods :episodesDemo,   user, episodeModal, episodeNotification, loading };
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodePage);