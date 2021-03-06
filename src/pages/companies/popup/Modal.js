import React, { useState, useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import { getBese64Image } from '../../../helpers/applicationUtils';







function UserFormModal(props) {

  const {
    pageDropDown: { company_country = [], company_state = [], timezoneconst=[] },
    formData: { companyName = '', countryId = '', stateId = '',
      zipCode = '', city = '',timeZone=0,
      address = '', contact1 = '', contact2 = '', details = '',

      imageFullURL = '', imageURL = '', previewFile = undefined },
    handleSubmit, handleChange, handleFileChange, title, buttonText, mode = 'new', ...others } = props;
     


  const [validated, setValidated] = useState(false);
  const handleFormSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {


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
          <Row class="row">
            <Col sm={12}>
              <label for="name" >Company Name</label>
              <input type="text" class="form-control"
                label="Name" required
                label="Company Name"
                variant="outlined"
                onChange={handleChange}
                name="companyName"
                value={companyName}
                validators={['required']}
                errorMessages={['this field is required']}
              /></Col>

            <Col sm={6} className="form-group">
              <label for="name" class="col-space">Country</label>
              <select id="inputState" class="form-control"
                label="Company"
                required
                onChange={handleChange}
                name='countryId'
                value={countryId}
                validators={['required']}
                errorMessages={['this field is required']}>
                <option value="" >Select Country</option>
                {company_country.map((item) =>
                  <option value={item.id}>{item.name}</option>)
                }


              </select>
            </Col>
            <Col sm={6} className="form-group">
              <label for="name" class="col-space">State</label>
              <select id="inputState" class="form-control"
                label="State"
                required
                onChange={handleChange}
                name='stateId'
                value={stateId}
                validators={['required']}
                errorMessages={['this field is required']}>
                <option value="" >Select State</option>
                {  company_state.map((item) =>
                  <option value={item.id}>{item.name}</option>)
                }
              </select>
            </Col>

            <Col sm={6}>
              <label for="name">City</label>
              <input type="text" class="form-control"
                placeholder="City"
                label="Contact 1" required
                variant="outlined"
                onChange={handleChange}
                name="city"
                value={city}
                validators={['required']}
                errorMessages={['this field is required']}
              /></Col>

            <Col sm={6}>
              <label for="name">ZipCode</label>
              <input type="text" class="form-control"
                placeholder="ZipCode"
                label="Contact 1" required
                variant="outlined"
                onChange={handleChange}
                name="zipCode"
                value={zipCode}
                validators={['required']}
                errorMessages={['this field is required']}
              /></Col>

           <Col sm={6}>
              <label for="name">Address</label>
              <input type="text" class="form-control"
                id="outlined-multiline-static"
                label="Address"
                placeholder="Address"
                multiline required
                rows="4"
                name="address"
                value={address}
                onChange={handleChange}
                variant="outlined"
              />
            </Col>

            <Col sm={6} className="form-group">
              <label for="name" class="col-space">TimeZone</label>
              <select id="inputState" class="form-control"
                label="Timezone"
                required
                onChange={handleChange}
                name='timeZone'
                value={timeZone}
                validators={['required']}
                errorMessages={['this field is required']}>
                <option value="" >Select TimeZone</option>
                {timezoneconst.map((item) =>
                  <option value={item.timeZoneId}>{item.name}</option>)
                }


              </select>
            </Col>
            <Col sm={12}>
              <br></br>
              <div class="text-right">
                <button type="submit" class="btn btn-primary waves-effect waves-light">Save</button>
              </div>
            </Col>
          </Row>
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
