import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
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

const EventListView = () => {
  const classes = useStyles();
  const [classroom] = useState(data);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(null);

  const [{ data: queryData, loading, error }, refetch] = useAxios({
    url: SERVICES.GET_EVENT,
    method: 'GET',
    params: { perPage: limit, page: page + 1, search }
  });

  const handleSearch = e => {
    setSearch(e.target.value);
    refetch();
  };

  return (
    <Page className={classes.root} title="Event">
      <Container maxWidth={false}>
        <Toolbar handleSearch={handleSearch} search={search} />
        <Box mt={3}>
          <Results
            classroom={classroom}
            queryData={queryData}
            loading={loading}
            error={error}
            refetch={refetch}
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default EventListView;
