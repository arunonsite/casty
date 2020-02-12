import React, { Component } from 'react';
import { Modal,Button } from 'react-bootstrap';
import { Row, Col  } from 'reactstrap';
function UserFormModal(props) {
  const {
    data:{fname='', lname='', username='', password='', cpassword='',email='',cemail='', phone=''},
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
                            <form onSubmit={handleSubmit}>
                                <div class="row">
                                  <div class="col-12">
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="userName3">First Name</label>
                                      <div class="col-md-9">
                                        <input type="text"  value={fname} onChange={handleChange} class="form-control" id="userName3" name="name" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="userName3">Last Name</label>
                                      <div class="col-md-9">
                                        <input type="text"  value={lname} onChange={handleChange} class="form-control" id="userName3" name="name" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Username</label>
                                      <div class="col-md-9">
                                        <input type="text" value={username} onChange={handleChange} id="password3" name="username" class="form-control" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Password</label>
                                      <div class="col-md-9">
                                        <input type="password" value={password} onChange={handleChange} id="password3" name="password" class="form-control" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Confirm Password</label>
                                      <div class="col-md-9">
                                        <input type="password" value={cpassword} onChange={handleChange} id="cpassword3" name="cpassword" class="form-control" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Email</label>
                                      <div class="col-md-9">
                                        <input type="text" value={email} onChange={handleChange} id="email" name="email" class="form-control" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Confirm Email</label>
                                      <div class="col-md-9">
                                        <input type="text" value={cemail} onChange={handleChange} id="cemail" name="cemail" class="form-control" required />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="password3"> Phone</label>
                                      <div class="col-md-9">
                                        <input type="password" value={phone} onChange={handleChange} id="phone" name="phone" class="form-control" required />
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
