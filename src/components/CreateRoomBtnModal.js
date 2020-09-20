import React,  { useState, useCallback, useRef } from 'react';
import firebase from 'firebase/app';
import { database } from '../api/firebase'

import { Button, Icon, Modal, Form, FormGroup, ControlLabel, FormControl, Schema, Alert } from 'rsuite';
import { useModalState } from '../hooks/custom-hooks';


// button to open a chat room modal window

// rsuite provides helper method to validate form data when we submit
// To do so, need to define schema to submit to rsuite, then
// rsuite will check against this schema
// Schema can define a data model for validating data, and can validate Form component data.
// Schema.Model Defining Data Model objects
// Schema.Types Provides a set of data types

// inside Model, putting an object that will represent our state
// same as our initial state

// destructuring types from Schema types
const { StringType } = Schema.Types;

const model = Schema.Model({
  // our object key variables are string types
  // StringType().isRequired('This field required') - default error message
  name: StringType().isRequired('Chat name is required'),
  description: StringType().isRequired('Description is required')
});

// initial state
// The name of form-control
const INITIAL_FORM = {
  name: '',
  description: ''
}

const CreateRoomBtnModal = () => {

  // custom hook for default boolean values
  const { isOpen, open, close } = useModalState();

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  
  // useRef hook to access dom 
  const formRef = useRef();

  // when submitting form
  const [isLoading, setIsLoading] = useState(false);

  // when using onChange event with rsuit, it automatically give us
  // the Value as it's first arg, not the event object 
  const onFormChange = useCallback((value) => {
    setFormValue(value)
  }, [])
  // rsuit gives the value of entire form, not a single input

  const onSubmit = async () => {
    // validate data against define Schema using useRef hook
    // check method is available in form component & directly accessing here
    // if data is not validate
    if (!formRef.current.check()) {
      return null;
    }

    // else data is validate, update our database with new chat room data
    // submitting form data
    setIsLoading(true);

    // creating new object which gets save to our database
    const newRoomData = {
      ...formValue, 
      // adding new key
      createdAt: firebase.database.ServerValue.TIMESTAMP
    }
    
    try {
      // uploading data & creating ref path to db
      // push	method to Add to a list of data into our rooms object in the database.
      await database.ref('rooms').push(newRoomData);

      // display alert
      Alert.info(`${formValue.name} has been created`, 4000)

      setIsLoading(false);

      // setting to initial value
      setFormValue(INITIAL_FORM)

      // closing modal window
      close();

      
      
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 4000);
    }

  }

  return (
    <div className="mt-1">
      
    <Button block color="green" onClick={open}>
      <Icon icon="creative" /> Create new chat room!
    </Button>

    <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New chat room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name..." />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter room description..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
