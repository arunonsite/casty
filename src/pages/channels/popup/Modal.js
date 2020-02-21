import React, { Component, useRef  } from 'react';
import { Modal } from 'react-bootstrap';
import { Container, Row, Col, Card, CardBody, Label, FormGroup,   Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
 
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

  const inputRef = useRef(null);
  const classes = useStyles();
  const {
    formData:{name='', description='', cphoto=''},
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

 
 <ValidatorForm
className={classes.root} 
 onSubmit={handleSubmit}
 onError={errors => console.log(errors)}
 ref={inputRef}
>
<Row>   
<Col xl={12}>
          
        <TextValidator
           label="Name"
           label="Channel Name"
           variant="outlined"
           onChange={handleChange}
           name="name"
           value={name}
           validators={['required']}
           errorMessages={['this field is required']}
        /></Col> 
        <Col xl={12}>
        <TextValidator
          id="outlined-multiline-static"
          label="Description"
          placeholder="Channel Description"
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
        <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-photo"
                    
                    type="file"
                />
     </Col>
     <Col xl={12}>
 
        </Col>
        </Row>
        <Button type="submit" className="btn btn-secondary button-next float-right">Add Channel</Button>
            </ValidatorForm>


             {/*  <Row>
                <Col xl={12}>
                  <div class="card">
                    <div class="card-body">

                      <div id="rootwizard">
                        
                        <div class="tab-content mb-0 b-0">
                          <div class="tab-pane active" id="first">

                            <div class="tab-pane" id="first">
                            <AvForm onSubmit={handleSubmit}>
                                <div class="row">
                                  <div class="col-12">
                                   
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="Show">Channel Name</label>
                                      <div class="col-md-9">
                                      
                                      <AvField value={name} onChange={handleChange} 
                                      class="form-control" id="name" name="name" 
                                       type="text" errorMessage="Invalid name" validate={{
                                     required: {value: true}
                                     }} />
                                    
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="show">Channel Description</label>
                                      <div class="col-md-9">
                                     <AvField value={description} onChange={handleChange} class="form-control" id="description" name="description"  type="text" errorMessage="Invalid Description" validate={{
                                     required: {value: true}
                                     }} />
                                      </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                      <label class="col-md-3 col-form-label" for="show">Photo</label>
                                      <div class="col-md-9 ">
                                     <AvField type="file" value={cphoto}  class="form-control" id="cphoto" name="cphoto" 
                                      errorMessage="Invalid Images" 
                                       />
                                    
                                      </div>
                                      
                                    </div>
     
                                  </div>
                                </div>
                                <FormGroup className="btn btn-secondary button-next float-right">
          <Button>Add Channel</Button>
        </FormGroup>
                          </AvForm>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row> */}
  

        </Modal.Body>
        
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
