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

const EventForm = ({
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
          } Event sebagai informasi`}
          title={values._id ? 'Edit Event' : 'Add Event'}
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
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(touched.time && errors.time)}
                fullWidth
                helperText={touched.time && errors.time}
                label="time"
                name="time"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.time}
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(touched.date && errors.date)}
                fullWidth
                helperText={touched.date && errors.date}
                name="date"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                defaultValue={values.date}
                type="date"
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Select Trainer"
                name="userId"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.userId}
                variant="outlined"
              >
                {loadingTrainer ? (
                  <option>loading...</option>
                ) : (
                  dataTrainer.data.map(option => (
                    <option key={option._id} value={option._id}>
                      {option.fullName}
                    </option>
                  ))
                )}
              </TextField>
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
                error={Boolean(touched.eventDetail && errors.eventDetail)}
                helperText={touched.eventDetail && errors.eventDetail}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                id="outlined-multiline-static"
                label="Event Detail"
                name="eventDetail"
                multiline
                rows={4}
                variant="outlined"
                required
                value={values.eventDetail}
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

EventForm.propTypes = {
  className: PropTypes.string
};

export default withFormik({
  enableReinitialize: true,
  validationSchema,
  mapPropsToValues: props => {
    const { dataEvent } = props;

    return {
      _id: dataEvent._id,
      title: dataEvent.title || '',
      time: dataEvent.time || '',
      date: moment(dataEvent.date).format('YYYY-MM-DD') || '',
      eventDetail: dataEvent.eventDetail || '',
      userId: dataEvent.userId ? dataEvent.userId._id : '',
      imgLink: dataEvent.imgLink || null
    };
  },
  handleSubmit: (payload, { props, ...rest }) =>
    props.handleSubmit(payload, rest),
  displayName: 'Event'
})(EventForm);
