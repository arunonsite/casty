import React, { useRef , useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { getBese64Image } from '../../../helpers/applicationUtils';   
import {   Row, Col } from 'reactstrap';
import Files from 'react-files';

function DepartmentFormModal(props) {
  const [validated, setValidated] = useState(false);

  const [isFileReplaceInitiated, setIsFileReplaceInitiated] = useState(false);
  const [departmentfile, setDepartmentFile] = useState([]);
  const fileRef = useRef(null);
  let { currentUsrAccess = 1, mode = 'edit',
    pageDropDown: { availableCompany = [] },
    formData: { name = '',
      description = '', companyID,
      imageFullURL = '', imageURL = '', previewFile = undefined },
    handleSubmit,handleFileChange,
     handleChange, title, ...others } = props;
    
  if (imageFullURL !== '' && departmentfile.length === 0 && !isFileReplaceInitiated) {
    const initialPreview = { preview: { type: 'image', url: imageFullURL } };

    setDepartmentFile([initialPreview]);
    getBese64Image(imageFullURL).then((succ2) => {
      handleFileChange({ name: imageURL, data: succ2 });
    });
  }

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
  const onFilesChange = (image) => {
    
    setDepartmentFile(false);
    setDepartmentFile(
      image)
    getBese64Image(image[0].preview.url).then(function (imageBase64) {
      const processeImage = Object.assign({ ...image[0] }, { data: imageBase64 });
      handleFileChange(processeImage)
    });
  }
  const onFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  const filesRemoveAll = () => {
    setDepartmentFile([]);
    setIsFileReplaceInitiated(true);
    // this.refs.departmentfile.removeFiles()
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
              <Col>
                <label for="name">Department Thumbnail</label>
                {
                  departmentfile.length > 0 ?
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
                      <h3>Upload Department Thumbnail Here.</h3>
                    </div>
                  </Files>
                  <div class="dropify-preview" style={{ display: departmentfile.length > 0 ? "block" : "none " }}  >

                    <div class="dropify-render">
                      {
                        departmentfile.length > 0
                          ?
                          <div className='files-list'>
                            <div>{departmentfile.map((file) =>
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
              <div class="col-sm-12">
                <div class="text-right">
                  <button type="submit" class="btn btn-primary waves-effect waves-light">Save</button>

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
