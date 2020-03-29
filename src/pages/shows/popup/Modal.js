import React, { useRef , useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import {   Row, Col } from 'reactstrap';
import MenuItem from '@material-ui/core/MenuItem';

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
  const [validated, setValidated] = useState(false);

  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const classes = useStyles();
  const {
    formData: {companyID    ='', name = '', description = '', channelId = '', id = '',
     imageFullURL = '', imageURL = '', previewFile = undefined },
    handleSubmit, handleChange, handleFileChange, title, buttonText, mode = 'new',
     channelsByUser = [],pageDropDown:{availableChannel=[],availableCompany=[]}, ...others } = props;
  const changeShowImage = (image) => {
    handleFileChange(JSON.parse(document.getElementsByName("showImage")[0].value));
  }

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
  const initialShowImage = (image) => {
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


  return (
    <Modal
      {...others}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body  style={{ backgroundColor: "#f5f6fa" }}>

      <div class="custom-modal-text text-left col-12" >
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Row>
            <Col xl={12}>
            <label for="name">Channel Name</label>

            <input type="text" required
              class="form-control"
                label="Name"
                label="Show Name"
                variant="outlined"
                onChange={handleChange}
                name="name"
                value={name}
                validators={['required']}
                errorMessages={['this field is required']}
              /></Col>
  <Col xl={12}>
  <label for="name">Comapny</label>

  <select required
    class="form-control"
                label="Company"
                label="Company"
                variant="outlined"
                onChange={handleChange}
                name='companyID'
                value={companyID}
                validators={['required']}
                errorMessages={['this field is required']}
              >
                 <option value="" >Select Comapny</option>
                 {availableCompany.map((item) =>
                  <option value={item.id}>{item.companyName}</option>)
                } 
              </select>
            </Col>
            <Col xl={12}>
            <label for="name">Channel</label>

            <select
            required
              class="form-control"
                label="Channel"
                label="Channel"
                variant="outlined"
                onChange={handleChange}
                name='channelId'
                value={channelId}
                validators={['required']}
                errorMessages={['this field is required']}
              >
                  <option value="" >Select Channel</option>
                 {availableChannel.map((item) =>
                  <option value={item.id}>{item.name}</option>)
                } 
              </select>
            </Col>
            <Col xl={12}>
            <label for="name">Description</label>

         <input type="text"
         required
           class="form-control"
                id="outlined-multiline-static"
                label="Description"
                placeholder="Show Description"
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
              required
                allowFileEncode={true}
                ref={fileRef}
                onupdatefiles={(rowData) => changeShowImage(rowData[0])}
                allowMultiple={false}
                maxFiles={1}
                name="showImage"
                id="showImage"
                allowFilePoster={true}
                allowImagePreview={true}
                {...(previewFile ? { files: previewFile } : {})}

                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpeg']}
                accept="image/*"
                labelIdle='Drag & Drop your Show Image or <span class="filepond--label-action">Browse</span>'
                 oninit={(rowData) => initialShowImage(rowData)} 
              />

            </Col>
           
            <Col xl={12}>

            </Col>
          </Row>
          <input type="submit" value={buttonText} class="btn btn-secondary button-next float-right" />
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
