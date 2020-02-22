import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 364,
    },
  },
}));

  

function UserFormModal(props) {
  const classes = useStyles(); 
  const {
    formData: { fname = '', lname = '', username = '', password = '', 
    cpassword = '', email = '', cemail = '', phone = '', role='' },
    handleSubmit, handleChange, title, constants:{roleSource=[]}, ...others } = props;
    
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
                        <ValidatorForm
                          className={classes.root}
                          onSubmit={handleSubmit}
                          onError={errors => console.log(errors)}

                        >
                          <Row  >
                            <Col sm={6}>
                              <TextValidator
                                label="Name"
                                label="First Name"
                                variant="outlined"
                                onChange={handleChange}
                                value={fname} onChange={handleChange}
                                name='fname'

                                validators={['required']}
                                errorMessages={['this field is required']}
                              /></Col>

                            <Col sm={6}>
                              <TextValidator
                                label="Name"
                                label="Last Name"
                                variant="outlined"
                                value={lname} onChange={handleChange}
                                name="lname"
                                validators={['required']}
                                errorMessages={['this field is required']}
                              />
                            </Col>
                          </Row>

                          <Row style={{ "padding": "4px" }}>
                            <Col sm={6}>
                              <TextValidator
                                label="Username"
                                label="User Name"
                                variant="outlined"
                                onChange={handleChange}
                                value={username} 
                                name='username'
                                validators={['required']}
                                errorMessages={['this field is required']}
                              /></Col>
                                <Col sm={3}>
                              <SelectValidator 
                                label="Role"
                                label="Role"
                                variant="outlined"
                                onChange={handleChange}
                                value={role} 
                                name='role'
                                
                                options={roleSource}
                                validators={['required']}
                                errorMessages={['this field is required']}
                              >
                                 {roleSource.map( (item) =>
           <MenuItem value={item}>{item}</MenuItem> )     
}
                                </SelectValidator>
                              </Col>


                          </Row>

                          <Row style={{ "padding": "4px" }}>
                            <Col sm={6}>
                              <TextValidator
                                label="Password"
                                label="Password"
                                variant="outlined"
                                onChange={handleChange}
                                value={password}  
                                name='password'
                                type="password"
                    validators={['required']}
                    errorMessages={[ 'this field is required']}
                              /></Col>

                            <Col sm={6}>
                              <TextValidator
                                label="Confirm"
                                label="Confirm Password"
                                variant="outlined"
                                value={cpassword} onChange={handleChange}
                                name="repeatPassword"
                                type="password"
                                validators={['required', 'isPasswordMatch']}
                                errorMessages={['this field is required','password mismatch']}
                              />
                            </Col>
                          </Row>

                          <Row style={{ "padding": "4px" }}>
                            <Col sm={6}>
                              <TextValidator
                                label="Email"
                                label="Email"
                                variant="outlined"
                               
                                value={email} onChange={handleChange}
                                name='email'

                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                              /></Col>
                            <Col sm={6}>
                              <TextValidator
                                label="Confirm Email"
                                label="Confirm Email"
                                variant="outlined"
                                value={cemail}
                                name="cemail"
                                onChange={handleChange}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                              />
                            </Col>
                          </Row>


                          <Row style={{ "padding": "4px" }}>
                            <Col sm={6}>
                              <TextValidator
                                label="Phone"
                                label="Phone"
                                variant="outlined"
                                onChange={handleChange}
                                value={phone} onChange={handleChange}
                                name='phone'

                                validators={['required']}
                                errorMessages={['this field is required']}
                              /></Col>
                          </Row>

                          <ul class="list-inline wizard mb-0">
                            <input type="submit" value="Add" class="btn btn-secondary button-next float-right" />
                          </ul>
                        </ValidatorForm>
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
  const { handlehide, show, mode = 'add' } = props;
  return (
    <>
      {mode === 'add' || mode === 'edit' ? <UserFormModal
        onHide={() => handlehide()}
        {...props}
      /> : ''}
    </>
  );
}
export default (UserForm);
