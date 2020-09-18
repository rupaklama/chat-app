import React, { useState, useCallback } from 'react';
import { Input, InputGroup, Icon, Alert } from 'rsuite';

const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = 'Write your value',
  emptyMsg = 'Input is empty',
  // Using spread props to make default props of route available - match, history & location
  ...inputProps
}) => {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);

  // value - instead, event, in react suite
  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    // reverse value of our current state
    // reverse boolean value, false to true
    // isEditable to true, so that we can edit input
    setIsEditable(p => !p);

    // if cancel it, set to initial value
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    // trim method removes unnecessary spaces/whitespace
    // from user into input button
    const trimmed = input.trim();

    // no text, display message
    if(trimmed === '') {
      Alert.info(emptyMsg, 4000)
    }

    if(trimmed !== initialValue && trimmed !== '') {
      // calling callback to update input with new value
      await onSave(trimmed) // new value as arg
    }

    // set to initial value
    setIsEditable(false)
  };

  return (
    <div>
      {label}

      <InputGroup>
        <Input
          {...inputProps}
          // isEditable will be true, but disable it
          disabled={!isEditable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? 'close' : 'edit2'} />
        </InputGroup.Button>

        {/* another button on top of it, pencil icon to check */}
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
