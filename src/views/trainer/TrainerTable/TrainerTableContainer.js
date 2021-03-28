import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import TrainerTable from './TrainerTable';
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

const TrainerTableContainer = ({ mainActions: { getTrainerDetail } }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(null);
  const [trainerId, setTrainer] = useState(null);

  const { open, handleOpen, handleClose, body, setBody } = useModal();

  const navigate = useNavigate();

  const [{ data: queryData, loading, error }, refetch] = useAxios({
    url: SERVICES.GET_TRAINER,
    method: 'GET',
    params: { perPage: limit, page: page + 1, search }
  });

  const [, deleteTrainer] = useAxios(
    {
      url: SERVICES.DELETE_TRAINER(trainerId),
      method: 'DELETE'
    },
    { manual: true }
  );

  const handleDeleteTrainer = async () => {
    try {
      await deleteTrainer();

      handleClose();
      refetch();
    } catch (error) {}
  };

  function handleOpenModalClick(id, title) {
    setTrainer(id);

    setBody(`Are you sure you want to delete ${title} from list?`);

    handleOpen();
  }

  const handleSearch = e => {
    setSearch(e.target.value);
    refetch();
  };

  const handleEdit = id => {
    const _trainer = queryData.data.find(_data => _data._id === id);


    getTrainerDetail(_trainer);

    navigate(`/app/trainer/edit`);
  };
  
  const moveAdd = () => {
    getTrainerDetail({});
    navigate(`/app/trainer/add`);
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
          <TrainerTable
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
            handleYesClick={handleDeleteTrainer}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default TrainerTableContainer;
