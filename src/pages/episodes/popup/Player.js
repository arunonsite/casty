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
             src={[{src: "http://castymediaservice001-usct.streaming.media.azure.net/50ba1e43-adc0-4199-ba46-dd07f7adbfd6/Elvis_Presley_Patch_It_Up_1970.ism/manifest", type: "application/vnd.ms-sstr+xml" }]}
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
