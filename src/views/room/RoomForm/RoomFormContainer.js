import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import RoomForm from './RoomForm';
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

const RoomFormContainer = ({ room, mainActions: { getRoomDetail } }) => {
  const classes = useStyles();
  const navigate = useNavigate();


  const [, addRoom] = useAxios(
    {
      url: SERVICES.ADD_ROOM,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    { manual: true }
  );

  const [, editRoom] = useAxios(
    {
      url: SERVICES.EDIT_ROOM(''),
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
      await editRoom({
        url: SERVICES.EDIT_ROOM(values._id),
        data
      });

      navigate('/app/room', { replace: true });
    } else {
      // const data = objectToFormData(values);

      await addRoom({ data });

      navigate('/app/room', { replace: true });
    }
  };

  const handleBack = () => {
    getRoomDetail({});

    navigate(`/app/room`);
  };

  return (
    <Page className={classes.root} title="RoomFormContainer">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <RoomForm
              dataRoom={room}
              handleSubmit={handleSubmit}
              handleBack={handleBack}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default RoomFormContainer;
