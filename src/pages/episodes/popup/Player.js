import React, { Component, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player'







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
  <ReactPlayer width="100%"
            height="100%" url='https://www.youtube.com/watch?v=ysz5S6PUM-U'  playing />

      </Modal.Body>

    </Modal>
  );
}

function PlayerForm(props) {
   console.log("props---", props);
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
