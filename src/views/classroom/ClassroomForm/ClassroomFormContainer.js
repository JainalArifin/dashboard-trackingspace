import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import ClassroomForm from './ClassroomForm';
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

const ClassroomFormContainer = ({
  classroom,
  mainActions: { getClassroomDetail }
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [
    { data: dataTrainer, loading: loadingTrainer, error: errorTrainer }
  ] = useAxios({
    url: SERVICES.GET_TRAINER,
    method: 'GET',
    params: { all: true }
  });

  const [
    { data: dataVideo, loading: loadingVideo, error: errorVideo }
  ] = useAxios({
    url: SERVICES.GET_VIDEO_CLASS,
    method: 'GET',
    params: { all: true }
    
  });

  const [, addClassroom] = useAxios(
    {
      url: SERVICES.ADD_CLASSROOM,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    { manual: true }
  );

  const [, editClassroom] = useAxios(
    {
      url: SERVICES.EDIT_CLASSROOM(''),
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    { manual: true }
  );

  const handleSubmit = async values => {
    

    const data = await objectToFormData(values);
    
    if (values._id) {
      await editClassroom({
        url: SERVICES.EDIT_CLASSROOM(values._id),
        data
      });
      
      navigate('/app/classroom', { replace: true });
    } else {
      
      await addClassroom({ data });

      navigate('/app/classroom', { replace: true });
    }
  };

  const handleBack = () => {
    getClassroomDetail({});

    navigate(`/app/classroom`);
  };

  return (
    <Page className={classes.root} title="ClassroomFormContainer">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <ClassroomForm
              dataClassroom={classroom}
              handleSubmit={handleSubmit}
              handleBack={handleBack}
              dataTrainer={dataTrainer}
              loadingTrainer={loadingTrainer}
              errorTrainer={errorTrainer}
              dataVideo={dataVideo}
              loadingVideo={loadingVideo}
              errorVideo={errorVideo}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ClassroomFormContainer;
