import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { FieldArray } from 'formik';
import formikHelpers from 'src/utils/formikHelpers';

const initialVideo = [
  {
    _id: ''
  }
];

export default function VideoFiled({
  name,
  field, // video values,
  dataVideo,
  loadingVideo,
  errors,
  touched,
  setFieldValue
}) {
  const { isError } = formikHelpers(errors, touched);

  function handleSourceChannelChange(sourceName, value, index) {
    setFieldValue(`${name}[${index}]._id`, value);
  }

  return (
    <FieldArray
      name={name}
      render={channelArrHelpers => (
        <>
          {field &&
            field.map((list, videoIdx) => (
              <div
                style={{
                  marginBottom: 30
                }}
              >
                <TextField
                  key={videoIdx}
                  fullWidth
                  label={`Select Video ${videoIdx + 1}`}
                  name={`${name}[${videoIdx}]._id`}
                  onChange={({ target: { name, value } }) =>
                    handleSourceChannelChange(name, value, videoIdx)
                  }
                  required
                  select
                  SelectProps={{ native: true }}
                  value={list._id}
                  variant="outlined"
                >
                  {loadingVideo ? (
                    <option>loading...</option>
                  ) : (
                    dataVideo.data.map(option => (
                      <option key={option._id} value={option._id}>
                        {option.title}
                      </option>
                    ))
                  )}
                </TextField>
              </div>
            ))}
          {/* add video */}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => channelArrHelpers.push(initialVideo)}
            >
              Add Video
            </Button>
          </Grid>
        </>
      )}
    />
  );
}
