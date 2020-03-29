import React, {  useRef , useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import {  Row, Col } from 'reactstrap';

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

  const { currentUsrAccess,
    pageDropDown: { availableCompany = [], availableDepartment=[] },
    formData: { name = '', description = '', imageFullURL = '', imageURL = '', previewFile = undefined, companyId = '' },
    handleSubmit, handleChange, handleFileChange, title, buttonText, mode = 'new', ...others } = props;


  const fileRef = useRef(null);
  const changeChannelImage = (image) => {
    handleFileChange(JSON.parse(document.getElementsByName("channelImage")[0].value));
  }
  const initialChannelImage = (image) => {
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
      <Modal.Body style={{ backgroundColor: "#f5f6fa" }}>

        {/* 
        <ValidatorForm
          className={classes.root}
          onSubmit={handleSubmit}
          onError={errors => console.log(errors)}
          ref={inputRef}
        > */}
        <Row>
          {/*  <Col xl={12}>

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
              <SelectValidator
                label="Company"
                label="Company"
                variant="outlined"
                onChange={handleChange}
                name='companyId'
                value={companyId}
                validators={['required']}
                errorMessages={['this field is required']}
              >
                 {availableCompany.map((item) =>
                  <MenuItem value={item.id}>{item.companyName}</MenuItem>)
                } 
              </SelectValidator>
            </Col> 
            <Col xl={12}>
              <FilePond
                allowFileEncode={true}
                ref={fileRef}
                onupdatefiles={(rowData) => changeChannelImage(rowData[0])}
                allowMultiple={false}
                maxFiles={1}
                name="channelImage"
                id="channelImage"
                allowFilePoster={true}
                allowImagePreview={true}
                {...(previewFile ? { files: previewFile } : {})}
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpeg']}
                accept="image/*"
                labelIdle='Drag & Drop your Channel or <span class="filepond--label-action">Browse</span>'
                oninit={(rowData) => initialChannelImage(rowData)}              />
            </Col>
            <Col xl={12}>

            </Col> */}

          <div class="custom-modal-text text-left col-12" >


            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

              <Col className="form-group">
                <label for="name">Channel Name</label>

                <input type="text"
                required
                  class="form-control"
                  onChange={handleChange}
                  name="name"
                  value={name}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  placeholder="Chennel name" />


              </Col>
              <Col className="form-group">
                <label for="name">Channel Description</label>

                <input type="text"
                required
                  class="form-control"
                  onChange={handleChange}
                  multiline
                  rows="4"
                  name="description"
                  value={description}


                  validators={['required']}
                  errorMessages={['this field is required']} />
              </Col>
              <Col className="form-group">
                <label for="name">Company</label>
                <select id="inputState" class="form-control"
                  label="Company"
                  required
                  onChange={handleChange}
                  name='companyId'
                  value={companyId}
                  validators={['required']}
                  errorMessages={['this field is required']}>
                  <option>Select Company</option>
                  {availableCompany.map((item) =>
                    <option value={item.id}>{item.companyName}</option>)
                  }
                </select>
              </Col>
              <Col  >
                <label for="name">Channel Photo</label>
                <FilePond
                  allowFileEncode={true}
                  ref={fileRef}
                  onupdatefiles={(rowData) => changeChannelImage(rowData[0])}
                  allowMultiple={false}
                  maxFiles={1}
                  name="channelImage"
                  id="channelImage"
                  allowFilePoster={true}
                  allowImagePreview={true}
                  {...(previewFile ? { files: previewFile } : {})}
                  allowFileTypeValidation={true}
                  acceptedFileTypes={['image/png', 'image/jpeg']}
                  accept="image/*"
                  labelIdle='Drag & Drop your Channel or <span class="filepond--label-action">Browse</span>'
                  oninit={(rowData) => initialChannelImage(rowData)} />
              </Col>
              <Col xl={12}>
              <button type="submit" class="btn btn-primary waves-effect waves-light">{buttonText}</button>
              </Col>
            </Form>
          </div>
        </Row>
        
      





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
