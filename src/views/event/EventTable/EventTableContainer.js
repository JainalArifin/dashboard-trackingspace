import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import EventTable from './EventTable';
import Toolbar from './Toolbar';
import useAxios from 'axios-hooks';
import { SERVICES } from 'src/configs';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from 'src/components/modal';
import { useModal } from 'src/hooks';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const EventTableContainer = ({ mainActions: { getEventDetail } }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(null);
  const [eventId, setEventId] = useState(null);

  const { open, handleOpen, handleClose, body, setBody } = useModal();

  const navigate = useNavigate();

  const [{ data: queryData, loading, error }, refetch] = useAxios({
    url: SERVICES.GET_EVENT,
    method: 'GET',
    params: { perPage: limit, page: page + 1, search }
  });

  const [, deleteEvent] = useAxios(
    {
      url: SERVICES.DELETE_EVENT(eventId),
      method: 'DELETE'
    },
    { manual: true }
  );

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent();

      handleClose();
      refetch();
    } catch (error) {}
  };

  function handleOpenModalClick(id, title) {
    setEventId(id);

    setBody(`Are you sure you want to delete ${title} from list?`);

    handleOpen();
  }

  const handleSearch = e => {
    setSearch(e.target.value);
    refetch();
  };

  const handleEdit = id => {
    const _event = queryData.data.find(_data => _data._id === id);


    getEventDetail(_event);

    navigate(`/app/event/edit`);
  };
  
  const moveAdd = () => {
    getEventDetail({});
    navigate(`/app/event/add`);
  }

  return (
    <Page className={classes.root} title="Event">
      <Container maxWidth={false}>
        <Toolbar
          handleSearch={handleSearch}
          search={search}
          moveAdd={moveAdd}
        />
        <Box mt={3}>
          <EventTable
            queryData={queryData}
            loading={loading}
            error={error}
            refetch={refetch}
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            handleEdit={handleEdit}
            handleOpenModalClick={handleOpenModalClick}
          />
          <ConfirmationModal
            isOpen={open}
            body={body}
            handleCloseModalClick={handleClose}
            handleYesClick={handleDeleteEvent}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default EventTableContainer;
