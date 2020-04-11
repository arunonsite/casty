import React, { Component, useRef } from 'react';
import { Modal } from 'react-bootstrap';
//import ReactPlayer from 'react-player'
import { AzureMP } from 'react-azure-mp'







function PlayerFormModal(props) {

  const inputRef = useRef(null);

  const { show =  false, title='', handlehide, streamManifestURL=''} = props;
   console
   .log("props-0-0-0-0", props);

  return (
    <Modal
    show = {show}
    onHide={() => handlehide()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <AzureMP
             skin="amp-flush"
             src={[{src: streamManifestURL, type: "application/vnd.ms-sstr+xml" }]}
           />


      </Modal.Body>

    </Modal>
  );
}

function PlayerForm(props) {
  const { handlehide} = props;
  return (
    <>
      <PlayerFormModal
        
        {...props}
      /> 
    </>
  );
}
export default (PlayerForm);
