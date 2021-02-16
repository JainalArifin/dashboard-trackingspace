import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Classroom from './Classroom';
import TotalEvent from './TotalEvent';
import TotalTrainer from './TotalTrainer';
import TotalMember from './TotalMember';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalTrainer />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Classroom />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalEvent />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalMember />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
