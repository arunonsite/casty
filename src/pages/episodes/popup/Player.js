import React, { Component, useRef } from 'react';
import { Modal } from 'react-bootstrap';
//import ReactPlayer from 'react-player'
import { AzureMP } from 'react-azure-mp'







function PlayerFormModal(props) {

  const inputRef = useRef(null);

  const { show =  false, title='', handlehide} = props;
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
             src={[{src: "http://castymediaservice001-usct.streaming.media.azure.net/049f1ebe-04fa-41aa-8498-77dfc4d2a067/06947D73-3C9B-4624-8876-A6A18EFF.ism/manifest", type: "application/vnd.ms-sstr+xml" }]}
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
