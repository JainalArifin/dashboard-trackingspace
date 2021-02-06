import React, { useState } from 'react';
import clsx from 'clsx';
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
  makeStyles,
  Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const EventForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Penambahan kelas sebagai informasi"
          title="Add Event"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the title"
                label="Title"
                name="title"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Speaker"
                name="speaker"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Select Status"
                name="status"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue="2017-05-24"
                // className={classes.textField}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="time"
                label="Time"
                type="time"
                defaultValue="07:30"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Event Detail"
                name="eventDetail"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Link component={RouterLink} to="/app/event" underline="none">
            <Button color="primary" variant="outlined">
              Cancel
            </Button>
          </Link>
          &nbsp;
          <Button color="primary" variant="contained">
            Add
          </Button>
        </Box>
      </Card>
    </form>
  );
};

EventForm.propTypes = {
  className: PropTypes.string
};

export default EventForm;
