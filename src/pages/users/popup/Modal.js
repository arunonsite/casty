import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

import { Row, Col } from 'reactstrap';






function UserFormModal(props) {


  const [validated, setValidated] = useState(false);
  let { currentUsrAccess = 1, mode = 'edit',
    pageDropDown: { availableCompany = [], roleSource = [] , availableDepartment=[]},
    formData: { roleSelected, firstName = '', lastName = '', username = '', password = '',
      cpassword = '', email = '', cemail = '', phone = '', companyID = '', blocked, departmentId='' },
    handleSubmit, handleChange, title, ...others } = props;


  const handleFormSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
     

      event.preventDefault();
      event.stopPropagation();
    
        handleSubmit();
    }
    
    setValidated(true);
  
  
  };
// handle storing the
  // confirmed password in state   
 const _handleConfirmedPassword = (event) => {
     
     const field = event.currentTarget;
     const {formData : {password= "", cpassword= ""}} = props;
     if(password !== cpassword){
      field.setCustomValidity("Passwords Don't Match");
      console.log("Not Matched");
     }else{
      field.setCustomValidity("");
      field.setValidated = true;
     } 
}


 

  const checkedStatus = blocked !== null ? { checked: false } : { checked: true };
  //Role Preselect 
  let role = roleSource.findIndex(source => source === roleSelected[0]);
  role = roleSource[role];
  //COmpany Preselect


  return (
    <Modal
      {...others}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f5f6fa" }}>
        {/*  <Row>
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
                                value={firstName} onChange={handleChange}
                                name='firstName'

                                validators={['required']}
                                errorMessages={['this field is required']}
                              /></Col>

                            <Col sm={6}>
                              <TextValidator
                                label="Name"
                                label="Last Name"
                                variant="outlined"
                                value={lastName} onChange={handleChange}
                                name="lastName"
                                validators={['required']}
                                errorMessages={['this field is required']}
                              />
                            </Col>
                          </Row>

                          <Row style={{ "padding": "4px" }}>
                             <Col xl={6}>
              <SelectValidator
                label="Company"
                label="Company"
                variant="outlined"
                onChange={handleChange}
                name='companyID'
                value={companyID}
                validators={['required']}
                errorMessages={['this field is required']}
              >
                 {availableCompany.map((item) =>
                  <MenuItem value={item.id}>{item.companyName}</MenuItem>)
                } 
              </SelectValidator>
            </Col> 
                                <Col sm={6}>
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
                          {mode !== 'edit'  ?        <Col sm={6}>
                              <TextValidator
                                label="Email"
                                label="Email"
                                variant="outlined"
                               
                                value={email} onChange={handleChange}
                                name='email'

                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                              /></Col> : '' }
                         <Col sm={6}> Status : 
                          <Checkbox
        {...checkedStatus}
        size="small"
        name="blocked"
        value={new Date()}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'checkbox with small size' }}
      />
</Col> 
</Row>{mode !== 'edit'  ?  
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
                                name="cpassword"
                                type="password"
                                validators={['isPasswordMatch','required' ]}
                                errorMessages={['password mismatch','this field is required']}
                              />
                            </Col> 
                          </Row> : ""
}                          
                       


                          <ul class="list-inline wizard mb-0">
                            <input type="submit" value="Add"
                             class="btn btn-secondary 
                             button-next float-right" />
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

 */}
        <div class="custom-modal-text text-left">
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="name">First Name</label>
                  <input type="text" class="form-control"
                    label="First Name"
                    required
                    variant="outlined"
                    onChange={handleChange}
                    value={firstName} onChange={handleChange}
                    name='firstName'

                    validators={['required']}
                    errorMessages={['this field is required']}

                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="name">Last Name</label>
                  <input type="text" class="form-control"
                    required
                    variant="outlined"
                    value={lastName} onChange={handleChange}
                    name="lastName"
                    validators={['required']}
                    errorMessages={['this field is required']}

                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Company</label>
                  <select id="inputState" class="form-control" variant="outlined"
                    onChange={handleChange}
                    name='companyID'
                    required
                    value={companyID}
                    validators={['required']}
                    default='0'
                    errorMessages={['this field is required']}>
                      <option value=''>Select Companay</option>
                    {availableCompany.map((item) =>
                      <option value={item.id}>{item.companyName}</option>)
                    }
                  </select>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Department</label>
                  <select id="inputState" class="form-control" variant="outlined"
                    onChange={handleChange}
                    name='departmentId'
                    required
                    value={departmentId}
                    validators={['required']}
                    default='0'
                    errorMessages={['this field is required']}>
                       <option value=''>Select Department</option>
                    {availableDepartment.map((item) =>
                      <option value={item.id}>{item.name}</option>)
                    }
                  </select>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Role</label>
                  <select id="inputState" class="form-control" onChange={handleChange}
                    value={role}
                    name='role'
                    required
                    options={roleSource}
                    validators={['required']}
                    errorMessages={['this field is required']}>
                    {roleSource.map((item) =>
                      <option value={item}>{item}</option>)
                    }
                  </select>
                </div>
              </div>
              {mode !== 'edit'  ?  
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="name">Email</label>
                  <input type="text" class="form-control"
                    value={email} onChange={handleChange}
                    name='email'
                    required
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}

                  />
                </div>
              </div> : null }
              {mode !== 'edit'  ?  
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="name">Password</label>
                  <input type="password" class="form-control"
                    required
                    onChange={handleChange}
                    value={password}
                    name='password'
                    id='password'
                    
                    
                    errorMessages={['this field is required']}
                    placeholder="Password"


                  />
                </div>
              </div> : null }
              {mode !== 'edit'  ?  
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="name">Confirm Password</label>
                  <input type="password" class="form-control"
                    label="Confirm Password"
                   
                    required
                    value={cpassword} 
                    onChange={handleChange}
                    onBlur={_handleConfirmedPassword}
                    name="cpassword"
                     
                    id="cpassword"
                 
                />
                </div>
              </div> : null }
              <div class="col-sm-12">
              <div class="col-sm-6">
                <div class="checkbox-success mb-2">

                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="switch to enable/disable the user"
                    {...checkedStatus}
                    size="small"
                    name="blocked"
                    onChange={handleChange}
                  />
                </div>
                </div>


              <div class="col-sm-12">
                <div class="text-right">
                  <button type="submit" class="btn btn-primary waves-effect waves-light">Save</button>

                </div>
              </div>
              </div>   
            </div>
          </Form>
        </div>
      </Modal.Body>

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
