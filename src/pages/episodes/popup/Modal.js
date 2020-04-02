import React, { useState, useRef } from 'react';
import { Modal , Form} from 'react-bootstrap';
import { Row, Col } from 'reactstrap';










function UserFormModal(props) {
  const [validated, setValidated] = useState(false);
  const {
    formData: { name = '', description = '', imageFullURL = '', imageURL = '', previewFile = undefined },
    handleSubmit, handleChange, handleFileChange, title, buttonText, mode = 'new', ...others } = props;



  
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


      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Row>
            <Col xl={12}>
            <label for="name">Episode Name</label>
                  <input type="text" required class="form-control"
                label="Name"
                label="Episode Name"
                variant="outlined"
                onChange={handleChange}
                name="name"
                value={name}
                validators={['required']}
                errorMessages={['this field is required']}
              /></Col>
            <Col xl={12}>
            <label for="name">Episode Description</label>
                  <input type="text" required class="form-control"
                id="outlined-multiline-static"
                label="Description"
                placeholder="Episode Description"
                multiline
                rows="4"
                name="description"
                value={description}
                onChange={handleChange}
                variant="outlined"
                validators={['required']}
                errorMessages={['this field is required']}
              /></Col>
            
            <Col xl={12}>

            </Col>
          </Row>
          <br></br>
          <input type="submit" value={buttonText} class="btn btn-primary waves-effect waves-light" />

        </Form>




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
