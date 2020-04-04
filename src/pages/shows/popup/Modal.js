import React, { useRef , useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import {   Row, Col } from 'reactstrap';
import { getBese64Image } from '../../../helpers/applicationUtils';             
import Files from 'react-files'

function UserFormModal(props) {
  const [validated, setValidated] = useState(false);
   const [isFileReplaceInitiated, setIsFileReplaceInitiated] = useState(false);
  const [channelfile, setChannelFile] = useState([]);

  const inputRef = useRef(null);
  const fileRef = useRef(null);
 
  const {
    formData: {companyID    ='', name = '', description = '', channelId = '', id = '',
     imageFullURL = '', imageURL = '', previewFile = undefined },
    handleSubmit, handleChange, handleFileChange, title, buttonText, mode = 'new',
     channelsByUser = [],pageDropDown:{availableChannel=[],availableCompany=[]}, ...others } = props;
  const changeShowImage = (image) => {
    handleFileChange(JSON.parse(document.getElementsByName("showImage")[0].value));
  }

  if (imageFullURL !== '' && channelfile.length === 0 && !isFileReplaceInitiated) {
    const initialPreview = { preview: { type: 'image', url: imageFullURL } };

    setChannelFile([initialPreview]);
    getBese64Image(imageFullURL).then((succ2) => {
      handleFileChange({ name: imageURL, data: succ2 });
    });
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


  const onFilesChange = (image) => {
    setChannelFile(false);
    setChannelFile(
      image)
    getBese64Image(image[0].preview.url).then(function (imageBase64) {
      const processeImage = Object.assign({ ...image[0] }, { data: imageBase64 });
      handleFileChange(processeImage)
    });
  }

  const onFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  const filesRemoveOne = (file) => {
    //this.refs.channelfile.removeFile(file)
    setChannelFile([]);
  }

  const filesRemoveAll = () => {

    setChannelFile([]);
    setIsFileReplaceInitiated(true);
    // this.refs.channelfile.removeFiles()
  }

  const filesUpload = () => {
    const formData = new FormData()

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
            <label for="name">Show Name</label>

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
            {/* <Col xl={12}>
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

            </Col> */}
           
            <Col>
                <label for="name">Show Image</label>
                {
                  channelfile.length > 0 ?
                    <button type="button"  style={{ float: 'right' }} class="dropify-clear btn btn-primary btn-sm waves-effect waves-light" onClick={filesRemoveAll} >X</button>
                    : null}
                <div class="dropify-wrapper">

                  <div class="dropify-loader"></div>
                  <div class="dropify-errors-container">
                    <ul></ul>
                  </div>
                  <Files
                    ref={fileRef}
                    className='files-dropzone-list'
                    style={{ height: '100px' }}
                    onChange={onFilesChange}
                    onError={onFilesError}
                    multiple={false}
                    name="showImage"
                    id="showImage"
                    clickable
                  >
                    <div class="dz-message needsclick">

                      <h3>Upload Show Image Here.</h3>
                    </div>
                  </Files>

                  <div class="dropify-preview" style={{ display: channelfile.length > 0 ? "block" : "none " }}  >

                    <div class="dropify-render">
                      {
                        channelfile.length > 0
                          ?
                          <div className='files-list'>
                            <div>{channelfile.map((file) =>
                              <div className='files-list-item' key={file.id}>
                                <div className='files-list-item-preview'>
                                  {file.preview.type === 'image'
                                    ? <img className='files-list-item-preview-image' src={file.preview.url} />
                                    : <div className='files-list-item-preview-extension'>{file.extension}</div>}
                                </div>


                              </div>
                            )}</div>

                          </div>
                          : null
                      }
                    </div>

                  </div>
                </div>


              </Col>
          </Row>
          <input type="submit" value={buttonText} class="btn btn-primary waves-effect waves-light" />
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
