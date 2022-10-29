import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const UploadAndDisplayImage = ({ image, handleUpload, handleRemove }) => {
  return (
    <>
      <Typography variant="h5">Upload recipe photo</Typography>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        {image && (
          <>
            <img
              alt="not found"
              width={'100%'}
              src={URL.createObjectURL(image)}
            />
            <label htmlFor="imageFile">
              <Button variant="text" component="span" onClick={handleRemove}>
                Remove
              </Button>
            </label>
          </>
        )}

        {!image && (
          <label htmlFor="imageFile">
            <Button variant="text" component="span">
              Upload
              <input
                type="file"
                accept="image/*"
                id="imageFile"
                name="imageFile"
                required
                hidden
                onChange={e => handleUpload(e)}
              />
            </Button>
          </label>
        )}
      </Box>
    </>
  );
};

export default UploadAndDisplayImage;
