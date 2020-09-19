import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { database, storage } from '../../api/firebase';
import { useAuth } from '../../context/auth.context';

import { Modal, Button, Alert } from 'rsuite';
import { useModalState } from '../../hooks/custom-hooks';
import ProfileAvatar from '../ProfileAvatar';

// The accept attribute specifies a filter for what file types
// the user can pick from the file Input dialog box (only for type="file")
const fileInputTypes = '.png, .jpeg, .jpg';
const AvatarUploadBtn = () => {
  // custom hook providing boolean values
  const { isOpen, open, close } = useModalState();

  // auth context object
  const { user } = useAuth();

  // to set image that we upload
  const [img, setImg] = useState(null);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // useRef hook to access & manipulate dom/react elements
  // to display our image
  const avatarEditorRef = useRef();

  // to upload file
  const onFileInputChange = event => {
    // MIME stands for "Multipurpose Internet Mail Extensions.
    // It's a way of identifying files on the Internet according to their nature and format.
    // For instance, a GIF image is given the MIME type of image/gif, a JPEG image is image/jpg
    const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    // check to see if upload file is correct MIME type
    const isValidFile = file => acceptedFileTypes.includes(file.type);

    const selectFile = event.target.files;
    // console.log(selectFile)
    // since its going to be always an array,
    // we need to check that we always select one file
    if (selectFile.length === 1) {
      const file = selectFile[0];

      // check to see if file is valid
      if (isValidFile(file)) {
        setImg(file);

        // open our modal window by calling open in custom-hook
        open();
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 4000);
      }
    }
  };

  // The resulting image will have the same resolution as the original image,
  // regardless of the editor's size. If you want the image sized in the
  // dimensions of the canvas you can use getImageScaledToCanvas
  const onUploadClick = async () => {
    // getting acutal current value of ref with useRef Hook
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    // when we upload
    setIsLoading(true);

    // first we need to convert canvas into some format to upload it
    // convert to Binary Large OBject (BLOB) file
    // A blob is a data type that can store binary data.
    // This is different than most other data types used in databases, such as integers,
    // floating point numbers, characters, and strings, which store letters and numbers.
    // Since blobs can store binary data, they can be used to store images or other multimedia files.

    // One reason for storing BLOBs in a database rather than on a file system is that
    // it's easier to associate "metadata" with a BLOB than it is with a file on a file system.

    // on this element, access to .toBlob method
    // which accept only callback as an arg

    // blob func returning promise object
    const getBlob = canvas => {
      // to create a Promise, we need to put callback inside
      return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('File process error'));
          }
        });
      });
    };

    try {
      // blob gets store in firebase storage
      const blob = await getBlob(canvas);

      // need to specify/create path to storage
      // child is the file named 'avatar' under this path
      const avatarFileRef = storage.ref(`/profile/${user.uid}`).child('avatar');

      // upload file
      // put method takes blob & metadata
      const uploadAvatarResult = await avatarFileRef.put(blob, {
        // metadata for newly uploaded object
        // 3600 seconds is 1 hour, 24 hours is 1 day
        // now, we have max age of 3 days specify in seconds
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      // to get download url of our file, save it in db
      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      // added one more child key
      const userAvatarRef = database
        .ref(`/profiles/${user.uid}`)
        .child('avatar');

      await userAvatarRef.set(downloadUrl);

      // after uploading
      setIsLoading(false);

      Alert.info('Avatar has been uploaded', 4000);
    } catch (error) {
      // if uploading fails
      setIsLoading(false);

      Alert.error(error.message, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={user.avatar}
        name={user.name}
        className="width-200 height-200 img-fullsize font-huge"
      />

      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust & upload new avatar!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                  ref={avatarEditorRef}
                />
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              appearance="ghost"
              block
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
