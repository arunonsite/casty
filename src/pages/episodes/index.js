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
      newDepartment : {   enumber: '',
      ename : '',
      edesc : '',
      ephoto : ''},
      episodes :[{
        enumber: '123',
        ename: 'mark',
        edesc : 'Test edesc',
        ephoto : 'test.mp4'
      },
      {
        enumber: '123',
        ename: 'John',
        edesc : 'Test description',
        ephoto : 'sample.mp4'
      }],
      addNewForm : false
    };
  }

  renderTableData() {
    return this.state.episodes.map((depart, index) => {
       const {  enumber,ename, edesc, ephoto } = depart //destructuring
       return (
          <tr key={enumber}>          
             <td>{Math.random(1)}</td>
             <td>{enumber}</td>
             <td>{ename}</td>
             <td>{edesc}</td>
             <td>{ephoto}</td>
             <td><button type="button" class="btn btn-primary btn-sm">View</button> <button type="button" class="btn btn-warning btn-sm">Edit</button>  <button type="button" class="btn btn-danger btn-sm">Delete</button> </td>
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
  const {episodes =[], newDepartment={}} = this.state;
  episodes.push(newDepartment);  
  this.setState({episodes: episodes,newDepartment : {  enumber:'', ename: '',
  edesc : '',
  ephoto : ''} });
}
toggleAdd = (event) =>{
  console.log('this is:', this);
  if(!this.state.addNewForm){
    this.setState ({addNewForm: true});
  }
}
  render() {
    const {newDepartment:{enumber='', ename='', edesc='', ephoto=''}} = this.state;
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
                <Col xl={12}>
                  <div class="card">
                    <div class="card-body">

                      <div id="rootwizard">
                        <ul class="nav nav-pills bg-secondary nav-justified form-wizard-header mb-3">
                          <li class="nav-item" data-target-form="#accountForm">
                            <a href="#first" data-toggle="tab" class="nav-link rounded-0 pt-2 pb-2">
                              <i class="mdi mdi-account-circle mr-1"></i>
                              <span class="d-none d-sm-inline" style={{color:'#FFF'}}>New Episodes</span>
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
                                      <label class="col-md-3 col-form-label" for="userName3">Episodes Number</label>
                                      <div class="col-md-9">
                                        <input type="text"  value={enumber} onChange={this.handleChange} class="form-control" id="episode_number" name="episode_number" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="userName3">Episodes Name</label>
                                      <div class="col-md-9">
                                        <input type="text"  value={ename} onChange={this.handleChange} class="form-control" id="episode_name" name="episode_name" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Episodes Description</label>
                                      <div class="col-md-9">
                                      <input type="text" value={edesc} onChange={this.handleChange} id="epi_description" name="epi_description" class="form-control" required />
                                       
                                      </div>
                                    </div>

                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="confirm3">Episodes Photo</label>
                                      <div class="col-md-9">
                                        <input type="file" value={ephoto} onChange={this.handleChange} id="episode_photo" name="episode_photo" class="form-control" required />
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
                  <h1>Episodes List</h1>
                  <div style={{float: "right"}}><button type="button" class="btn btn-primary btn-sm">Add</button></div>
                  <Table striped bordered hover>
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Episodes Number</th>
                    <th>Episodes Name</th>
                    <th>Episodes Description</th>
                    <th>Photo</th>
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