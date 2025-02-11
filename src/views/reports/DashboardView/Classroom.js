import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import YouTube from '@material-ui/icons/YouTube';
import { SERVICES } from 'src/configs';
import useAxios from 'axios-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Classroom = ({ className, ...rest }) => {
  const classes = useStyles();

  const [{ data: queryData, loading, error }] = useAxios({
    url: SERVICES.GET_CLASSROOM,
    method: 'GET'
  });

  const [{ data: queryDataVideo, loadingVideo, errorVideo }] = useAxios({
    url: SERVICES.GET_VIDEO_CLASS,
    method: 'GET'
  });

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Total Kelas
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {loading ? 'Loading' : queryData.total_data}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <YouTube />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <Typography className={classes.differenceValue} variant="body1">
            {loadingVideo ? 'Loading' : queryDataVideo && queryDataVideo.total_data}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Video Kelas
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Classroom.propTypes = {
  className: PropTypes.string
};

export default Classroom;
