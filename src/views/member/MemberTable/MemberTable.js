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

const MemberTable = ({
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

  const roomId = anchorEl && anchorEl.dataset.id;
  const roomTitle = anchorEl && anchorEl.dataset.title;


  const handleLimitChange = room => {
    setLimit(room.target.value);
    refetch();
  };

  const handlePageChange = (room, newPage) => {
    setPage(newPage);
    refetch();
  };

  const handleClick = room => {
    setAnchorEl(room.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const _handleEdit = () => {
    handleEdit(roomId);
  }

  
  function _handleOpenModalClick() {
    handleClose();

    handleOpenModalClick(roomId, roomTitle);
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            {(() => {
              if (loading) {
                return <Text style={{ padding: 10 }}>Waiting Fetch Data ...</Text>;
              }

              if (error) {
                return 'Error';
              }

              if (queryData) {
                return (
                  <TableBody>
                    {queryData.data.map((member, index) => {
                      return (
                        <TableRow hover key={index}>
                          <TableCell>{member.fullName}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.role}</TableCell>
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

MemberTable.propTypes = {
  className: PropTypes.string,
  classroom: PropTypes.array.isRequired
};

export default MemberTable;
