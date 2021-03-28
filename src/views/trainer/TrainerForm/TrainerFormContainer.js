import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import TrainerForm from './TrainerForm';
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

const TrainerFormContainer = ({ trainer, mainActions: { getEventDetail } }) => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();


  const [, addTrainer] = useAxios(
    {
      url: SERVICES.ADD_TRAINER,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    { manual: true }
  );

  const [, editTrainer] = useAxios(
    {
      url: SERVICES.EDIT_TRAINER(''),
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
      await editTrainer({
        url: SERVICES.EDIT_TRAINER(values._id),
        data
      });

      navigate('/app/trainer', { replace: true });
    } else {
      // const data = objectToFormData(values);

      await addTrainer({ data });

      navigate('/app/trainer', { replace: true });
    }
  };

  const handleBack = event => {
    getEventDetail({});

    navigate(`/app/trainer`);
  };

  return (
    <Page className={classes.root} title="TrainerFormContainer">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <TrainerForm
              dataTrainer={trainer}
              handleSubmit={handleSubmit}
              handleBack={handleBack}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default TrainerFormContainer;
