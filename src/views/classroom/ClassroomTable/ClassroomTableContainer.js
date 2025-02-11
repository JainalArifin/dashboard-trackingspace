import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import ClassroomTable from './ClassroomTable';
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

const ClassroomTableContainer = ({ mainActions: { getClassroomDetail } }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(null);
  const [classroomId, setClassroomId] = useState(null);

  const { open, handleOpen, handleClose, body, setBody } = useModal();

  const navigate = useNavigate();

  const [{ data: queryData, loading, error }, refetch] = useAxios({
    url: SERVICES.GET_CLASSROOM,
    method: 'GET',
    params: { perPage: limit, page: page + 1, search }
  });

  const [, deleteRoom] = useAxios(
    {
      url: SERVICES.DELETE_CLASSROOM(classroomId),
      method: 'DELETE'
    },
    { manual: true }
  );

  const handleDeleteRoom = async () => {
    try {
      await deleteRoom();

      handleClose();
      refetch();
    } catch (error) {}
  };

  function handleOpenModalClick(id, title) {
    setClassroomId(id);

    setBody(`Are you sure you want to delete ${title} from list?`);

    handleOpen();
  }

  const handleSearch = e => {
    setSearch(e.target.value);
    refetch();
  };

  const handleEdit = id => {
    const _classroom = queryData.data.find(_data => _data._id === id);

  
    getClassroomDetail(_classroom);

    navigate(`/app/classroom/edit`);
  };
  
  const moveAdd = () => {
    getClassroomDetail({});
    navigate(`/app/classroom/add`);
  }

  return (
    <Page className={classes.root} title="Classroom">
      <Container maxWidth={false}>
        <Toolbar
          handleSearch={handleSearch}
          search={search}
          moveAdd={moveAdd}
        />
        <Box mt={3}>
          <ClassroomTable
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
            handleYesClick={handleDeleteRoom}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default ClassroomTableContainer;
