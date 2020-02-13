import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
function UserFormModal(props) {
  const {
    data:{enumber='', ename='', edesc='', ephoto=''},
    handleSubmit,handleChange, title, ...others} = props;
    return (
      <Modal
        {...others}       
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Row>
                <Col xl={12}>
                  <div class="card">
                    <div class="card-body">

                      <div id="rootwizard">
                        
                        <div class="tab-content mb-0 b-0">
                          <div class="tab-pane active" id="first">

                            <div class="tab-pane" id="first">
                            <AvForm>
                                <div class="row">
                                  <div class="col-12">
                                  <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="Show">Episode Number</label>
                                      <div class="col-md-9">
                                      
                                      <AvField value={enumber}  class="form-control" id="enumber" name="enumber"  type="text" errorMessage="Invalid name" validate={{
                                     required: {value: true}
                                     }} />
                                    
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="Show">Episode Name</label>
                                      <div class="col-md-9">
                                      
                                      <AvField value={ename}  class="form-control" id="ename" name="ename"  type="text" errorMessage="Invalid name" validate={{
                                     required: {value: true}
                                     }} />
                                    
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="show">Episode Description</label>
                                      <div class="col-md-9">
                                     <AvField value={edesc}  class="form-control" id="edesc" name="edesc"  type="text" errorMessage="Invalid Description" validate={{
                                     required: {value: true}
                                     }} />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="show">Photo</label>
                                      <div class="col-md-9 ">
                                     <AvField type="file" value={ephoto}  class="form-control" id="ephoto" name="ephoto"  errorMessage="Invalid Description" validate={{
                                     required: {value: true}
                                     }} />
                                    
                                      </div>
                                      
                                    </div>
     
                                  </div>
                                </div>
                                <ul class="list-inline wizard mb-0">

                         

                          <input type="submit" value="Save New" class="btn btn-secondary button-next float-right"/>

                        
                          </ul>
                          </AvForm>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function UserForm(props) {
    const{handlehide, show, mode='add'} = props;  
    return (
      <>        
      { mode === 'add' || mode === 'edit' ?   <UserFormModal         
          onHide={() => handlehide()  }
          {...props}
        /> : ''}
      </>
    );
  }
  export default (UserForm);
