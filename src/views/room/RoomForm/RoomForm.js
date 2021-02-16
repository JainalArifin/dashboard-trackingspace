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

const RoomForm = ({
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
          } Room sebagai informasi`}
          title={values._id ? 'Edit Room' : 'Add Room'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Name"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(touched.type && errors.type)}
                fullWidth
                helperText={touched.type && errors.type}
                label="Type"
                name="type"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.type}
                variant="outlined"
                type="text"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <p>Image Trainer</p>
              <input
                name="imgLink"
                onBlur={handleBlur}
                onChange={event => {
                  setFieldValue('imgLink', event.currentTarget.files[0]);
                }}
                type="file"
              />
              {values._id && (
                <ImageLink
                  alt="imagaLink"
                  src={`${INITIALIZERS.BASE_URL}/${values.imgLink}`}
                />
              )}
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(touched.roomDetail && errors.roomDetail)}
                helperText={touched.roomDetail && errors.roomDetail}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                id="outlined-multiline-static"
                label="Room Detail"
                name="roomDetail"
                multiline
                rows={4}
                variant="outlined"
                required
                value={values.roomDetail}
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

RoomForm.propTypes = {
  className: PropTypes.string
};

export default withFormik({
  enableReinitialize: true,
  validationSchema,
  mapPropsToValues: props => {
    const { dataRoom } = props;
   
    return {
      _id: dataRoom._id,
      name: dataRoom.name || '',
      type: dataRoom.type || '',
      roomDetail: dataRoom.roomDetail || '',
      imgLink: dataRoom.imgLink || null
    };
  },
  handleSubmit: (payload, { props, ...rest }) =>
    props.handleSubmit(payload, rest),
  displayName: 'RoomForm'
})(RoomForm);
