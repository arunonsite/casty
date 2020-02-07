import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Table } from 'react-bootstrap';



import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';


class DefaultDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      newDepartment : {   sname: '',
      sdesc : '',
      sphoto : ''},
      shows :[{
        sname: 'Sun',
        sdesc : 'Test channel',
        sphoto : 'test.mp4'
      },
      {
        sname: 'Vijay',
        sdesc : 'Test channel',
        sphoto : 'test.mp4'
      }],
      addNewForm : false
    };
  }

  renderTableData() {
    return this.state.shows.map((depart, index) => {
       const {  sname, sdesc, sphoto } = depart //destructuring
       return (
          <tr key={sname}>          
             <td>{Math.random(1)}</td>
             <td>{sname}</td>
             <td>{sdesc}</td>
             <td>{sphoto}</td>
             <td><i class="fa fa-trash" aria-hidden="true"></i></td>
          </tr>
       )
    })
 }
 saveNew = () => {  //this.state.departments.push()

return false;
 }
 handleChange =  (event, field) => {   
  const {newDepartment ={}} = this.state;
  newDepartment[event.target.name] = event.target.value;  
  this.setState({newDepartment: {...newDepartment}});
}
 handleSubmit =(event) => {
  event.preventDefault();
  const {shows =[], newDepartment={}} = this.state;
  shows.push(newDepartment);  
  this.setState({shows: shows,newDepartment : {  sname: '',
  sdesc : '',
  sphoto : ''} });
}
toggleAdd = (event) =>{
  console.log('this is:', this);
  if(!this.state.addNewForm){
    this.setState ({addNewForm: true});
  }
}
  render() {
    const {newDepartment:{sname='', sdesc='', sphoto=''}} = this.state;
    return (
      <React.Fragment>
        <div className="">
          { /* preloader */}
          {this.props.loading && <Loader />}
          <Row></Row>
          <Row class='hidden'>

            <Col lg={12}>
            <Row>
            <Col xl={12}>
              <div style={{ float: "right" }} onClick={this.toggleAdd(this.event)} >
               </div>
            </Col>
              </Row>
              { this.state.addNewForm ?
              <Row>
                <Col xl={8}>
                  <div class="card">
                    <div class="card-body">

                      <div id="rootwizard">
                        <ul class="nav nav-pills bg-secondary nav-justified form-wizard-header mb-3">
                          <li class="nav-item" data-target-form="#accountForm">
                            <a href="#first" data-toggle="tab" class="nav-link rounded-0 pt-2 pb-2">
                              <i class="mdi mdi-account-circle mr-1"></i>
                              <span class="d-none d-sm-inline" style={{color:'#FFF'}}>New Show</span>
                            </a>
                          </li>

                        </ul>
                        <div class="tab-content mb-0 b-0">
                          <div class="tab-pane active" id="first">

                            <div class="tab-pane" id="first">
                            <form onSubmit={this.handleSubmit}>
                                <div class="row">
                                  <div class="col-12">
                                   
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="userName3">Show Name</label>
                                      <div class="col-md-9">
                                        <input type="text"  value={sname} onChange={this.handleChange} class="form-control" id="userName3" name="name" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Show Description</label>
                                      <div class="col-md-9">
                                        <input type="text" value={sdesc} onChange={this.handleChange} id="password3" name="email" class="form-control" required />
                                      </div>
                                    </div>

                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="confirm3">Show Photo/Video</label>
                                      <div class="col-md-9">
                                        <input type="file" value={sphoto} onChange={this.handleChange} id="confirm3" name="number" class="form-control" required />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <ul class="list-inline wizard mb-0">

                         

                          <input type="submit" value="Save New" class="btn btn-secondary button-next float-right"/>

                        
                          </ul>
                              </form>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
               : null }



            </Col>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h1>Channels List</h1>

                  <Table striped bordered hover>
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Show Name</th>
                    <th>Show Description</th>
                    <th>Show Photo/Video</th>
                    <th>Action</th>
                  </tr>
                    </thead>
                    <tbody>
                    {this.renderTableData()}

                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>


        </div>
      </React.Fragment>
    )
  }
}


export default connect()(DefaultDashboard);