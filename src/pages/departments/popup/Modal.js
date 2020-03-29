import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

import { makeStyles } from '@material-ui/core/styles';

function DepartmentFormModal(props) {
  console
    .log("props--", props);

  const [validated, setValidated] = useState(false);
  let { currentUsrAccess = 1, mode = 'edit',
  pageDropDown: { availableCompany = [] },
    formData: {  name=  '',
    description= '', companyID},
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
    
        <div class="custom-modal-text text-left">
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="name">Department Name</label>
                  <input type="text" class="form-control"
                    label="Department Name"
                    required
                    variant="outlined"
                    onChange={handleChange}
                    value={name} onChange={handleChange}
                    name='name'

                    validators={['required']}
                    errorMessages={['this field is required']}

                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="name">Department Description</label>
                  <input type="text" class="form-control"
                    required
                    variant="outlined"
                    value={description} onChange={handleChange}
                    name="description"
                    validators={['required']}
                    errorMessages={['this field is required']}

                  />
                </div>
              </div>
              <div class="col-sm-12">
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
                      <option value="">Select Company</option>
                    {availableCompany.map((item) =>
                      <option value={item.id}>{item.companyName}</option>)
                    }
                  </select>
                </div>
              </div>
             
              <div class="col-sm-12">
   


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

function DepartmentForm(props) {
  const { handlehide, show, mode = 'add' } = props;
  return (
    <>
      {mode === 'add' || mode === 'edit' ? <DepartmentFormModal
        onHide={() => handlehide()}
        {...props}
      /> : ''}
    </>
  );
}
export default (DepartmentForm);
