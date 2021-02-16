import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import VideoClassForm from './VideoClassForm';
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

const VideoClassFormContainer = ({ videoClass, mainActions: { getVideoClassDetail } }) => {
  const classes = useStyles();
  const navigate = useNavigate();


  const [, addVideoClass] = useAxios(
    {
      url: SERVICES.ADD_VIDEO_CLASS,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    { manual: true }
  );

  const [, editVideoClass] = useAxios(
    {
      url: SERVICES.EDIT_VIDEO_CLASS(''),
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
      await editVideoClass({
        url: SERVICES.EDIT_VIDEO_CLASS(values._id),
        data
      });

      navigate('/app/video-class', { replace: true });
    } else {
      // const data = objectToFormData(values);

      await addVideoClass({ data });

      navigate('/app/video-class', { replace: true });
    }
  };

  const handleBack = () => {
    getVideoClassDetail({});

    navigate(`/app/video-class`);
  };

  return (
    <Page className={classes.root} title="Video Class Form">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <VideoClassForm
              videoClass={videoClass}
              handleSubmit={handleSubmit}
              handleBack={handleBack}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default VideoClassFormContainer;
