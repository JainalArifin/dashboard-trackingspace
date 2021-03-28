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

const TrainerForm = ({
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
          } Trainer sebagai informasi`}
          title={values._id ? 'Edit Trainer' : 'Add Trainer'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(touched.fullName && errors.fullName)}
                fullWidth
                helperText={touched.fullName && errors.fullName}
                label="Full Name"
                name="fullName"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.fullName}
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                fullWidth
                helperText={touched.phoneNumber && errors.phoneNumber}
                label="Phone Number"
                name="phoneNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.phoneNumber}
                type="text"
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(touched.role && errors.role)}
                fullWidth
                helperText={touched.role && errors.role}
                label="Role"
                name="role"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.role}
                type="text"
                variant="outlined"
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
              <br />
              <ImageLink
                alt="imagaLink"
                src={`${INITIALIZERS.BASE_URL}/${values.imgLink}`}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(touched.detail && errors.detail)}
                helperText={touched.detail && errors.detail}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                id="outlined-multiline-static"
                label="Detail Trainer"
                name="detail"
                value={values.detail}
                multiline
                rows={4}
                variant="outlined"
                required
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

TrainerForm.propTypes = {
  className: PropTypes.string
};

export default withFormik({
  enableReinitialize: true,
  validationSchema,
  mapPropsToValues: props => {
    const { dataTrainer } = props;

    return {
      _id: dataTrainer._id,
      fullName: dataTrainer.fullName || '',
      email: dataTrainer.email || '',
      detail: dataTrainer.detail || '',
      phoneNumber: dataTrainer.phoneNumber || '',
      role: dataTrainer.role || '',
      imgLink: dataTrainer.imgLink || null
    };
  },
  handleSubmit: (payload, { props, ...rest }) =>
    props.handleSubmit(payload, rest),
  displayName: 'Trainer'
})(TrainerForm);
