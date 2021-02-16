import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import EventForm from './EventForm';
import useAxios from 'axios-hooks';
import { SERVICES } from 'src/configs';
import { objectToFormData } from '../../../utils/converter';
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const EventFormContainer = ({ event, mainActions: { getEventDetail } }) => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();

  const [
    { data: dataTrainer, loading: loadingTrainer, error: errorTrainer }
  ] = useAxios({
    url: SERVICES.GET_TRAINER,
    method: 'GET'
  });

  const [, addEvent] = useAxios(
    {
      url: SERVICES.ADD_EVENT,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    { manual: true }
  );

  const [, editEvent] = useAxios(
    {
      url: SERVICES.EDIT_EVENT(''),
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    { manual: true }
  );

  const handleSubmit = async values => {

    const data = objectToFormData(values);

    if (values._id) {
      await editEvent({
        url: SERVICES.EDIT_EVENT(values._id),
        data
      });

      navigate('/app/event', { replace: true });
    } else {
      // const data = objectToFormData(values);

      await addEvent({ data });

      navigate('/app/event', { replace: true });
    }
  };

  const handleBack = event => {
    getEventDetail({});

    navigate(`/app/event`);
  };

  return (
    <Page className={classes.root} title="EventFormContainer">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <EventForm
              dataEvent={event}
              handleSubmit={handleSubmit}
              handleBack={handleBack}
              dataTrainer={dataTrainer}
              loadingTrainer={loadingTrainer}
              errorTrainer={errorTrainer}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default EventFormContainer;
