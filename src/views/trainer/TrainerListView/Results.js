import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Button,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Modal,
  Snackbar
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { MoreHorizontal } from 'react-feather';
import useAxios from 'axios-hooks';
import { SERVICES } from 'src/configs';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Results = ({
  className,
  classroom,
  dataTrainer,
  loading,
  error,
  refetch,
  limit,
  setLimit,
  page,
  setPage,
  ...rest
}) => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [currenTrainer, setTrainer] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [, deletePartner] = useAxios(
    {
      url: SERVICES.DELETE_TRAINER(currenTrainer._id),
      method: 'DELETE'
    },
    { manual: true }
  );

  const handleLimitChange = event => {
    setLimit(event.target.value);
    refetch();
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    refetch();
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalDelete = trainer => {
    setModalOpen(true);
    setTrainer(trainer);
    handleClose();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteTrainer = async () => {
    try {
      await deletePartner();
      setOpenSnackbar(true);
      setModalOpen(false);
      refetch();
    } catch (error) {}
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {(() => {
              if (loading) {
                return <h3 style={{ padding: 10 }}>Waiting Fetch Data ...</h3>;
              }

              if (error) {
                return 'Error';
              }

              if (dataTrainer) {
                return (
                  <TableBody>
                    {dataTrainer.data.map((trainer, index) => {
                      return (
                        <TableRow hover key={index}>
                          <TableCell>{trainer.fullName}</TableCell>
                          <TableCell>{trainer.email}</TableCell>
                          <TableCell>{trainer.role}</TableCell>
                          <TableCell>
                            <IconButton
                              aria-controls="simple-menu"
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <MoreHorizontal />
                            </IconButton>
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                            >
                              <Link
                                component={RouterLink}
                                to={`/app/trainer/edit/${trainer._id}`}
                                underline="none"
                              >
                                <MenuItem onClick={handleClose}>Edit</MenuItem>
                              </Link>
                              <MenuItem
                                onClick={() => handleModalDelete(trainer)}
                              >
                                Delete
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                );
              }

              return null;
            })()}
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={dataTrainer && dataTrainer.total_data && dataTrainer.total_data}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      {/* <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal> */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleCloseModal}
      >
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Wait a minute...</h2>
          <br />
          <p id="transition-modal-description">
            Are you sure you want to delete Trainer {currenTrainer.fullName}?
          </p>
          <br />
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCloseModal}
            >
              cancel
            </Button>{' '}
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteTrainer}
            >
              delete
            </Button>
          </div>
        </div>
      </Modal>
      <Snackbar
        variant="success"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Berhasil di hapus"
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Berhasil di hapus
        </Alert>
      </Snackbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  classroom: PropTypes.array.isRequired
};

export default Results;
