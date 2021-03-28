import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { FieldArray } from 'formik';
import formikHelpers from 'src/utils/formikHelpers';
import { DeleteOutline } from '@material-ui/icons';

const initialVideo = { title: '', videoLink: '' };
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
    setFieldValue(`${name}[${index}].${sourceName}`, value);
  }

  return (
    <FieldArray
      name={name}
      render={channelArrHelpers => (
        <>
          {field &&
            field.map((list, videoIdx) => (
              <Grid
                container
                spacing={3}
                style={{
                  marginBottom: 30
                }}
              >
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    name={`${name}[${videoIdx}].title`}
                    onChange={({ target: { name, value } }) =>
                      handleSourceChannelChange(name, value, videoIdx)
                    }
                    label="Title"
                    name="title"
                    required
                    value={list.title}
                    variant="outlined"
                    type="text"
                    style={{ marginBottom: 10 }}
                  />
                  <TextField
                    fullWidth
                    name={`${name}[${videoIdx}].videoLink`}
                    onChange={({ target: { name, value } }) =>
                      handleSourceChannelChange(name, value, videoIdx)
                    }
                    label="Link video"
                    name="videoLink"
                    required
                    value={list.videoLink}
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item xs={1} container alignItems="center">
                  {field.length > 1 && (
                    <DeleteOutline
                      style={{ cursor: 'pointer' }}
                      onClick={() => channelArrHelpers.remove(videoIdx)}
                    />
                  )}
                </Grid>
              </Grid>
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
