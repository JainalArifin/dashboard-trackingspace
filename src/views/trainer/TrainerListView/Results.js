import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import getInitials from 'src/utils/getInitials';
import { MoreHorizontal } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, classroom, ...rest }) => {
  const classes = useStyles();
  const [selecteditemIds, setSelecteditemIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Class Room</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classroom.slice(0, limit).map(item => (
                <TableRow hover key={item.id}>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar className={classes.avatar} src={item.avatarUrl}>
                        {getInitials(item.title)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {item.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>Kelas Beginer Flutter</TableCell>
                  <TableCell>Success stories working on Coworking Space</TableCell>
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
                        to="/app/trainer/edit"
                        underline="none"
                      >
                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                      </Link>
                      <MenuItem onClick={handleClose}>View Details</MenuItem>
                      <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={classroom.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  classroom: PropTypes.array.isRequired
};

export default Results;
