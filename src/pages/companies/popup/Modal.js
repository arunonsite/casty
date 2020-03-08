import React, { Component, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import {  Row, Col } from 'reactstrap';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
// Import the plugin code
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
// Import the plugin styles
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';
registerPlugin(FilePondPluginFilePoster,
  FilePondPluginFileEncode,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview, FilePondPluginFileValidateType);


const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 364,
    },
  },
}));





function UserFormModal(props) {
   console
   .log("props---", props);
  const {
    formData: { companyName = '',  
     address='', contact1='', contact2='', details='',
    imageFullURL = '', imageURL = '', previewFile = undefined },
    handleSubmit, handleChange, handleFileChange, title, buttonText, mode = 'new', ...others } = props;


  const fileRef = useRef(null);
  const changeCompanyImage = (image) => {
    handleFileChange(JSON.parse(document.getElementsByName("companyImage")[0].value));
  }
  const initialCompanyImage = (image) => {
    let customrUrl = "http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png";
    getBese64Image(imageFullURL).then((succ) => {
      if (succ === undefined) {
        getBese64Image(customrUrl).then((succ2) => {
          handleFileChange({ name: imageURL, data: succ2 });
        });
      } else {
        handleFileChange({ name: imageURL, data: succ });
      }

    }).catch((error) => {
      console.log("error----", error);
    })


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
            <Col xl={6}>
              <TextValidator
                label="Name"
                label="Comapny Name"
                variant="outlined"
                onChange={handleChange}
                name="companyName"
                value={companyName}
                validators={['required']}
                errorMessages={['this field is required']}
              /></Col>
            <Col xl={6}>
              <TextValidator
                id="outlined-multiline-static"
                label="Address"
                placeholder="Address"
                
            
                name="address"
                value={address}
                onChange={handleChange}
                variant="outlined"
                validators={['required']}
                errorMessages={['this field is required']}
              /></Col>           
          </Row>
          <Row>
            <Col xl={6}>
              <TextValidator
                 placeholder="Contact 1"
                label="Contact 1"
                variant="outlined"
                onChange={handleChange}
                name="contact1"
                value={contact1}
                validators={['required']}
                errorMessages={['this field is required']}
              /></Col>
            <Col xl={6}>
              <TextValidator
                id="outlined-multiline-static"
                label="Contact 2"
                placeholder="Contact 2"
                
                name="contact2"
                value={contact2}
                onChange={handleChange}
                variant="outlined"
              /></Col>           
          </Row>

          <Row>
            <Col xl={12}>
            <TextValidator
                id="outlined-multiline-static"
                label="Details"
                placeholder="Details"
                multiline
                rows="4"
                name="details"
                value={details}
                onChange={handleChange}
                variant="outlined"
              />
              
              
              </Col>
                     
          </Row>
          <input type="submit" value={buttonText} class="btn btn-secondary button-next float-right" />

        </ValidatorForm>




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
