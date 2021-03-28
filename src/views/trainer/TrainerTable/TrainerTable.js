import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
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
  MenuItem
} from '@material-ui/core';
import { MoreHorizontal } from 'react-feather';
import moment from 'moment';
import { Text } from 'src/components/elements';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const TrainerTable = ({
  className,
  classroom,
  queryData,
  loading,
  error,
  refetch,
  limit,
  setLimit,
  page,
  setPage,
  handleEdit,
  handleOpenModalClick,
  ...rest
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const trainerId = anchorEl && anchorEl.dataset.id;
  const trainerFullname = anchorEl && anchorEl.dataset.fullname;

  const handleLimitChange = trainer => {
    setLimit(trainer.target.value);
    refetch();
  };

  const handlePageChange = (trainer, newPage) => {
    setPage(newPage);
    refetch();
  };

  const handleClick = trainer => {
    setAnchorEl(trainer.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _handleEdit = () => {
    handleEdit(trainerId);
  };

  function _handleOpenModalClick() {
    handleClose();

    handleOpenModalClick(trainerId, trainerFullname);
  }
  
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
                return (
                  <Text style={{ padding: 10 }}>Waiting Fetch Data ...</Text>
                );
              }

              if (error) {
                return 'Error';
              }

              if (queryData) {
                return (
                  <TableBody>
                    {queryData.data.map((trainer, index) => {
                      return (
                        <TableRow hover key={index}>
                          <TableCell>{trainer.fullName}</TableCell>
                          <TableCell>{trainer.email}</TableCell>
                          <TableCell>{trainer.role}</TableCell>
                          <TableCell>
                            <IconButton
                              aria-controls="simple-menu"
                              aria-haspopup="true"
                              data-id={trainer._id}
                              data-fullname={trainer.fullName}
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
                              <MenuItem onClick={_handleEdit}>Edit</MenuItem>
                              <MenuItem onClick={_handleOpenModalClick}>
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
        count={queryData && queryData.total_data && queryData.total_data}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

TrainerTable.propTypes = {
  className: PropTypes.string,
  classroom: PropTypes.array.isRequired
};

export default TrainerTable;
