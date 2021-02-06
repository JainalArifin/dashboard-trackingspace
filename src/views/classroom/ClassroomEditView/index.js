import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ClassroomBanner from './ClassroomBanner';
import ClassroomForm from './ClassroomForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ClassroomEditView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="ClassroomEditView"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <ClassroomBanner />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ClassroomForm />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ClassroomEditView;
