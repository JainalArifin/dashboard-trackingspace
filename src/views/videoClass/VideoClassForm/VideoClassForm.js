import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { withFormik } from 'formik';
import validationSchema from './validation';
import moment from 'moment';
import { INITIALIZERS } from 'src/configs';
import styled from 'styled-components';

const ImageLink = styled.img`
  width: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 2px solid #bababa;
  padding: 5px;
`;

const VideoClassForm = ({
  dataTrainer,
  loadingTrainer,
  handleBack,

  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  touched,
  values,
  setFieldValue,
  isValid,
  dirty
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader={`${
            values._id ? 'Perubahan' : 'Penambahan'
          } Video Class sebagai informasi`}
          title={values._id ? 'Edit Video Class' : 'Add Video Class'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(touched.title && errors.title)}
                fullWidth
                helperText={touched.title && errors.title}
                label="Title"
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.title}
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(touched.videoLink && errors.videoLink)}
                fullWidth
                helperText={touched.videoLink && errors.videoLink}
                label="Video Link"
                name="videoLink"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.videoLink}
                variant="outlined"
                type="text"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button onClick={handleBack} color="primary" variant="outlined">
            Cancel
          </Button>
          &nbsp;
          <Button
            color="primary"
            disabled={isSubmitting || !isValid || !dirty}
            type="submit"
            variant="contained"
          >
            {isSubmitting ? 'loading' : values._id ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

VideoClassForm.propTypes = {
  className: PropTypes.string
};

export default withFormik({
  enableReinitialize: true,
  validationSchema,
  mapPropsToValues: props => {
    const { videoClass } = props;

    return {
      _id: videoClass._id,
      title: videoClass.title || '',
      videoLink: videoClass.videoLink || ''
    };
  },
  handleSubmit: (payload, { props, ...rest }) =>
    props.handleSubmit(payload, rest),
  displayName: 'VideoClassForm'
})(VideoClassForm);
