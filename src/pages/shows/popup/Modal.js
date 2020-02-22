import React, { Component, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 364,
    },
  },
}));

function UserFormModal(props) {

  const inputRef = useRef(null);
  const classes = useStyles();
  const {
    formData: { name = '', description = '', cphoto = '' },
    handleSubmit, handleChange, title, buttonText = '', channelsByUser = [], ...others } = props;
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
            <Col xl={12}>

              <TextValidator
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
              <SelectValidator
                label="Channel"
                label="Channel"
                variant="outlined"
                onChange={handleChange}
                name='channelId'
              >
                {channelsByUser.map((item) =>
                  <MenuItem value={item.id}>{item.name}</MenuItem>)
                }
              </SelectValidator>
            </Col>
            <Col xl={12}>
              <TextValidator
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
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-photo"

                type="file"
              />
            </Col>
            <Col xl={12}>

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
