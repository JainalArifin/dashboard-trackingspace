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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAxios from 'axios-hooks';
import { SERVICES, INITIALIZERS } from '../../../configs';
import { objectToFormData } from '../../../utils/converter';
import styled from 'styled-components';

const ImageLink = styled.img`
  width: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 2px solid #bababa;
  padding: 5px;
`;

const TrainerForm = ({ dataPartner, loading, id }) => {
  const navigate = useNavigate();

  const [, editTrainer] = useAxios(
    {
      url: SERVICES.EDIT_TRAINER(id),
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    { manual: true }
  );

  const handleAdd = async values => {
    const data = objectToFormData(values);

    try {
      const response = await editTrainer({ data });

      console.log({ response });
      navigate('/app/trainer', { replace: true });
    } catch (error) {
      console.log({ error });
    }
  };

  if (loading) {
    return 'Please wait, data fetching  data detail in progress…';
  }

  return (
    <Formik
      initialValues={{
        fullName: dataPartner.fullName,
        email: dataPartner.email,
        detail: dataPartner.detail,
        phoneNumber: dataPartner.phoneNumber,
        role: dataPartner.role,
        imgLink: dataPartner.imgLink
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string()
          .max(50)
          .required('Fullname is required'),
        email: Yup.string()
          .email('Must be a valid email')
          .max(30)
          .required('Email is required'),
        detail: Yup.string()
          .max(255)
          .required('Detail is required'),
        phoneNumber: Yup.string()
          .max(30)
          .required('Detail is required'),
        role: Yup.string()
          .max(30)
          .required('Role is required')
      })}
      onSubmit={handleAdd}
    >
      {({
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
      }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              subheader="Perubahan Trainer sebagai informasi"
              title="Edit Trainer"
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
                  <br/>
                  <ImageLink
                    alt="imagaLink"
                    src={`${INITIALIZERS.BASE_URL}/${dataPartner.imgLink}`}
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
              <Link component={RouterLink} to="/app/trainer" underline="none">
                <Button color="primary" variant="outlined">
                  Cancel
                </Button>
              </Link>
              &nbsp;
              {console.log({isSubmitting, isValid, dirty})}
              <Button
                color="primary"
                disabled={isSubmitting || !isValid || !dirty}
                type="submit"
                variant="contained"
              >
                {isSubmitting ? 'loading' : 'Update'}
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

TrainerForm.propTypes = {
  className: PropTypes.string
};

export default TrainerForm;
