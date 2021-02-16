import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import RoomTable from './MemberTable';
import Toolbar from './Toolbar';
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

const MemberTableContainer = ({ mainActions: { getRoomDetail } }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(null);



  const [{ data: queryData, loading, error }, refetch] = useAxios({
    url: SERVICES.GET_MEMBER,
    method: 'GET',
    params: { perPage: limit, page: page + 1, search }
  });


  const handleSearch = e => {
    setSearch(e.target.value);
    refetch();
  };

  

  return (
    <Page className={classes.root} title="Member">
      <Container maxWidth={false}>
        <Toolbar
          handleSearch={handleSearch}
          search={search}
        />
        <Box mt={3}>
          <RoomTable
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

export default MemberTableContainer;
