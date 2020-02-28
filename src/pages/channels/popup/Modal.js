import React, { Component, useRef  } from 'react';
import { Modal } from 'react-bootstrap';
import { Container, Row, Col, Card, CardBody, Label, FormGroup,   Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import { makeStyles } from '@material-ui/core/styles';


// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import { getBese64Image } from '../../../helpers/applicationUtils';
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginFileEncode, FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateType);


const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 364,
    },
  },
}));





function UserFormModal(props) {
  const {
    formData:{name='', description='', cphoto=''},
    handleSubmit,handleChange,handleFileChange,  title,buttonText, ...others} = props;
  const fileRef = useRef(null);
  const changeChannelImage = (image) =>{
    
     handleFileChange(JSON.parse( document.getElementsByName("channelImage")[0].value));
  }

  const inputRef = useRef(null);
  const classes = useStyles();
  

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
       <FilePond
       allowFileEncode={true}
        ref={fileRef}
        onupdatefiles= {(  rowData) => changeChannelImage( rowData[0])}
        allowMultiple={false}
        maxFiles={1} 
        name="channelImage"
        id="channelImage"
       
                    allowFileTypeValidation={true}
                    acceptedFileTypes={['image/png', 'image/jpeg']}
                    accept="image/*"
        labelIdle='Drag & Drop your Channel or <span class="filepond--label-action">Browse</span>'
      />

     </Col>
     <Col xl={12}>
 
        </Col>
        </Row>
        <input type="submit" value={buttonText} class="btn btn-secondary button-next float-right" />

            </ValidatorForm>


  

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
