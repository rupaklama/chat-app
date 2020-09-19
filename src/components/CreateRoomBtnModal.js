import React from 'react';
import { Button, Icon, Modal, Form, FormGroup, ControlLabel, FormControl } from 'rsuite';
import { useModalState } from '../hooks/custom-hooks';


// button to open a chat room modal window
const CreateRoomBtnModal = () => {

  // custom hook for default boolean values
  const { isOpen, open, close } = useModalState();

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
            // onChange={onFormChange}
            // formValue={formValue}
            // model={model}
            // ref={formRef}
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
            // onClick={onSubmit}
            // disabled={isLoading}
          >
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
