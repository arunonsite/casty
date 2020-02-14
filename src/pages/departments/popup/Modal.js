import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
function UserFormModal(props) {
  const {
    data:{name='', email='', number=''},
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
                                      <label class="col-md-3 col-form-label" for="Show">Department Name</label>
                                      <div class="col-md-9">
                                      
                                      <AvField value={name}  class="form-control" id="dept_name" name="dept_name"  type="text" errorMessage="Invalid name" validate={{
                                     required: {value: true}
                                     }} />
                                    
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="Show">Department Email</label>
                                      <div class="col-md-9">
                                      
                                      <AvField value={email}  class="form-control" id="email" name="email"  type="text" errorMessage="Invalid name" validate={{
                                     required: {value: true}
                                     }} />
                                    
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="show">Conact Number</label>
                                      <div class="col-md-9">
                                     <AvField value={number}  class="form-control" id="number" name="number"  type="text" errorMessage="Invalid Description" validate={{
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
