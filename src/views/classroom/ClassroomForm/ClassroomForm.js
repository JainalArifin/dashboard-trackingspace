import React, { useState } from 'react';
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
  Link,
  Switch
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { withFormik } from 'formik';
import validationSchema from './validation';
import moment from 'moment';
import { INITIALIZERS } from 'src/configs';
import styled from 'styled-components';
import VideoFiled from './VideoFiled';

const ImageLink = styled.img`
  width: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 2px solid #bababa;
  padding: 5px;
`;

const initialVideo = [''];

const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const ClassroomForm = ({
  dataTrainer,
  loadingTrainer,
  dataVideo,
  loadingVideo,
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
          } classroom sebagai informasi`}
          title={values._id ? 'Edit classroom' : 'Add classroom'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
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
                {!values.userId && <option value=""></option>}
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
              <p>Image Classroom</p>
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
                  alt="imgLink"
                  src={`${INITIALIZERS.BASE_URL}/${values.imgLink}`}
                />
              )}
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(
                  touched.classRequirement && errors.classRequirement
                )}
                helperText={touched.classRequirement && errors.classRequirement}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                id="outlined-multiline-static"
                label="Classroom Requirment"
                name="classRequirement"
                multiline
                rows={4}
                variant="outlined"
                required
                value={values.classRequirement}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(touched.classDetail && errors.classDetail)}
                helperText={touched.classDetail && errors.classDetail}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                id="outlined-multiline-static"
                label="Class Detail"
                name="classDetail"
                multiline
                rows={4}
                variant="outlined"
                required
                value={values.classDetail}
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
              container
              direction="row"
              alignItems="center"
            >
              <Grid>Offline</Grid>
              <Grid>
                <Switch
                  checked={values.type}
                  onChange={() => {
                    setFieldValue('type', !values.type);
                    if (!values._id) {
                      if (!values.type) {
                        setFieldValue('time', '');
                        setFieldValue('day', '');
                        setFieldValue('max', '');
                      }
                    }
                  }}
                  name="checkedA"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Grid>
              <Grid>Online</Grid>
            </Grid>

            {values.type ? (
              <Grid
                item
                md={12}
                xs={12}
                style={{
                  border: '1px solid #bdbdbd',
                  borderRadius: 3,
                  padding: 10
                }}
              >
                <VideoFiled
                  name="videoId"
                  dataVideo={dataVideo}
                  loadingVideo={loadingVideo}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  field={values.videoId}
                  setFieldValue={setFieldValue}
                />
              </Grid>
            ) : (
              <>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.time && errors.time)}
                    fullWidth
                    helperText={touched.time && errors.time}
                    label="Time"
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
                    fullWidth
                    label="Select Day"
                    name="day"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.day}
                    variant="outlined"
                  >
                    {hari.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(touched.max && errors.max)}
                    fullWidth
                    helperText={touched.max && errors.max}
                    label="Max People"
                    name="max"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.max}
                    variant="outlined"
                    type="number"
                  />
                </Grid>
              </>
            )}
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

ClassroomForm.propTypes = {
  className: PropTypes.string
};

export default withFormik({
  enableReinitialize: true,
  validationSchema,
  mapPropsToValues: props => {
    const { dataClassroom } = props;

    return {
      _id: dataClassroom._id,
      title: dataClassroom.title || '', //
      userId: dataClassroom.userId ? dataClassroom.userId._id : '', //
      imgLink: dataClassroom.imgLink || null, //
      classRequirement: dataClassroom.classRequirement || '', //
      classDetail: dataClassroom.classDetail || '', //
      type: dataClassroom.type || true,
      videoId: dataClassroom.videoId ? dataClassroom.videoId : initialVideo,
      time: dataClassroom.time || '',
      day: dataClassroom.day || '',
      max: dataClassroom.max || ''
    };
  },
  handleSubmit: (payload, { props, ...rest }) =>
    props.handleSubmit(payload, rest),
  displayName: 'ClassroomForm'
})(ClassroomForm);
