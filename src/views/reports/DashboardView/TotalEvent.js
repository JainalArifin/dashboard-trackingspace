import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import Airplay from '@material-ui/icons/Airplay';
import useAxios from 'axios-hooks';
import { SERVICES } from 'src/configs';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const TotalEvent = ({ className, ...rest }) => {
  const classes = useStyles();

  const [{ data: queryData, loading, error }, refetch] = useAxios({
    url: SERVICES.GET_EVENT,
    method: 'GET'
  });

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Event
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {loading ? 'Loading' : queryData.total_data}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <Airplay />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalEvent.propTypes = {
  className: PropTypes.string
};

export default TotalEvent;
