import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';
import  * as episodeActions from '../../redux/episode/actions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import MaterialTable from "material-table";

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import Modal from './popup/Modal';

class EpisodePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(), 
       
      newEpisodeModalData :{
        formData : 
         { name: '',
           description: '',
          cphoto : ''}
        },
       
    };
  }
  componentDidMount(){
    this.loadPageData();
  }
  componentDidUpdate(){
   /*  const {episodeNotification : {notify = false, message='Success'}} = this.props; 
    if(notify){
      toast.success(message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });
        this.loadPageData();
    } */
  }

 loadPageData = () => {  //this.state.departments.push()
  const {user:{id=''}} = this.props;
  this.props.actions.loadEpisodes(id);
 }
 handleChange =  (event, field) => {   
  const {newEpisodeModalData :{formData={}}} = this.state;
  formData[event.target.name] = event.target.value;  
  this.setState({newEpisodeModalData: {formData : formData}});
 }
 handleSubmit =() => {

   
  const {user:{id=''}} = this.props;
  const { newEpisodeModalData:{formData={}}} = this.state; 
  const newCHannelData= Object.assign({...formData}, {userId : id}); 
 
 /*  if(mode === 'edit'){
    this.props.actions.updateChannel(newCHannelData);
  }else{
    this.props.actions.newEpisode(newCHannelData);
  } */
 }    
toggleEpisodeModal = () => {
  const {episodeModal : {episode = false}} = this.props; 
  const togg = { episodeModal: {
    episode: !episode,
    title: 'New Episode',
    mode : 'add',
    data:   {
      name: '',
      description: '',
      cphoto: ''
    },
  }};  
  this.props.actions.onclickModal(togg);
 }
toggleEditEpisodeModal = () => {
  const {episodeModal : {episode = false}} = this.props; 
  const togg = { episodeModal: {
    episode: !episode,
    title: 'Edit Episode',
    mode : 'add',
    formData:   episode,
  }};  
  this.props.actions.onclickModal(togg);
/*   const {episodeModal : {episode = false}} = this.props; 
  const togg = { episodeModal: {
    episode: !episode,
    title: 'Edit Episode',
    mode : 'edit',
    data:   {
      name: '',
      description: '',
      cphoto: ''
    },
  }};  
  this.props.actions.onclickModal(togg); */
 }

  render() {
 
    //const {newEpisode:{name='', description='', cphoto=''}} = this.state;
    const {   addNewUser = false, modalTitle, newEpisodeModalData={} } = this.state;
  



    const {episodes=[], episodeModal={}} = this.props;
    return (
      <React.Fragment>
        
        <div class="wrapper">
            <div class="container-fluid">
                 
            <div class="row">
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Channels</a></li>
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Shows</a></li>
                                    <li class="breadcrumb-item active">Episodes</li>
                                </ol>
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
                                            <input type="search" class="form-control" id="inputPassword2" placeholder="Search..." />
                                        </div>
                                    </form>
                                </div>
                                <div class="col-lg-4">
                                    <div class="text-lg-right mt-3 mt-lg-0">
                                        <button type="button" class="btn btn-danger waves-effect waves-light mr-1"><i class="mdi mdi-plus-circle mr-1"></i> Add New</button>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div>
             
           
                    {this.props.episodes.map((cols) => (
                <Row>
                  {cols.map((col) => (
                    <Col lg={4} md={4}> 
                        <div class="card">
                        <div class="card-box">
                  <h4 class="header-title">{col.name}</h4>
                  <p class="sub-header">Episode Number <code>{col.number}</code></p>
                           
                         
                        
                            <div class=" card-img-top img-fluid embed-responsive embed-responsive-21by9">
                                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/PrUxWZiQfy4?autohide=0&showinfo=0&controls=0"></iframe>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                  <p class="card-text">{col.desc}</p>
                                <a href="javascript:void(0);" class="btn btn-primary waves-effect waves-light">Button</a>
                            </div>
                            </div>
                        </div>
                        </Col>
                  ))}
                </Row>
              ))} 

            <div class="row">
                    <div class="col-lg-6">
                        <div class="card-box">
                            <h4 class="header-title">Responsive embed video 21:9</h4>
                            <p class="sub-header">Use class <code>.embed-responsive-21by9</code></p>
                           
                            <div class="embed-responsive embed-responsive-21by9">
                                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/PrUxWZiQfy4?autohide=0&showinfo=0&controls=0"></iframe>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="card-box">
                            <h4 class="header-title">Responsive embed video 16:9</h4>
                            <p class="sub-header">Use class <code>.embed-responsive-16by9</code></p>
                          
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/PrUxWZiQfy4?ecver=1"></iframe>
                            </div>
                        </div>
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
    actions: bindActionCreators(episodeActions, dispatch),
  };
}
const mapStateToProps = (state) => {
  const {Auth:{user={}} }= state;
  const episodeList = [{
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
  var episodes = [], size = 3;

while (episodeList.length > 0)
episodes.push(episodeList.splice(0, size));

  return {  user  , episodes};
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodePage);