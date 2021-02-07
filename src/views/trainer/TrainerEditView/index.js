import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import TrainerForm from './TrainerForm';
import { useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { SERVICES } from 'src/configs';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TrainerEditView = props => {
  const classes = useStyles();
  const { id } = useParams();

  const [{ data: dataPartner, loading, error }] = useAxios({
    url: SERVICES.GET_DETAIL_PARTNER(id),
    method: 'GET'
  });

  return (
    <Page className={classes.root} title="TrainerAddView">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <TrainerForm dataPartner={dataPartner} loading={loading} id={id} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default TrainerEditView;
