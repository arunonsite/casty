import React, { useRef, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import Files from 'react-files'

import { getBese64Image } from '../../../helpers/applicationUtils';








function UserFormModal(props) {

  const [validated, setValidated] = useState(false);
  const [isFileReplaceInitiated, setIsFileReplaceInitiated] = useState(false);
  const [channelfile, setChannelFile] = useState([]);
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

  const { currentUsrAccess,
    pageDropDown: { availableCompany = [], availableDepartment = [] },
    formData: { departmentId, name = '', description = '', imageFullURL = '', imageURL = '', previewFile = undefined, companyId = '' },
    handleSubmit, handleChange, handleFileChange, title, buttonText, mode = 'new', ...others } = props;

    if (imageFullURL !== '' && channelfile.length === 0 && !isFileReplaceInitiated) {
      const initialPreview = { preview: { type: 'image', url: imageFullURL } };
  
      setChannelFile([initialPreview]);
      getBese64Image(imageFullURL).then((succ2) => {
        handleFileChange({ name: imageURL, data: succ2 });
      });
    }
  const fileRef = useRef(null);
  const initialChannelImage = (imageFullURL) => {
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
      <Modal.Body style={{ backgroundColor: "#f5f6fa" }}>
        <Row>
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
                  <option value="" >Select Company</option>
                  {availableCompany.map((item) =>
                    <option value={item.id}>{item.companyName}</option>)
                  }
                </select>
              </Col>
              <Col className="form-group">
                <label for="name">Department</label>
                <select id="inputState" class="form-control"
                  label="Company"
                  required
                  onChange={handleChange}
                  name='departmentId'
                  value={departmentId}
                  validators={['required']}
                  errorMessages={['this field is required']}>
                  <option value="" >Select Department</option>
                  {availableDepartment.map((item) =>
                    <option value={item.id}>{item.name}</option>)
                  }
                </select>
              </Col>


              <Col>
                <label for="name">Channel Photo</label>
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

                    clickable
                  >
                    <div class="dz-message needsclick">

                      <h3>Upload Channel Photo Here.</h3>
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



              <Col xl={12}>
                <button type="submit"

                  class="btn btn-primary waves-effect waves-light"
                >{buttonText}</button>
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
