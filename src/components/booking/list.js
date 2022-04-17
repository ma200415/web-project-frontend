import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

import { useContext } from 'react';

import { listBooking, queryDog } from '../../helpers/WebAPI'
import { dateToString } from '../../helpers/utils'
import { AuthContext } from "../../authContext"

const theme = createTheme();

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'date',
    label: 'Date',
  },
  {
    id: 'dog',
    label: 'Dog',
  },
  {
    id: 'contact',
    label: 'Contact',
  },
  {
    id: 'remark',
    label: 'Remark',
  },
  {
    id: 'submitTimestamp',
    label: 'Submit Date',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Your Bookings
      </Typography>

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default function ListBooking() {
  const [bookingList, setBookingList] = useState([]);
  const [alert, setAlert] = useState({});
  const { user } = useContext(AuthContext);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    retrieveBookings();
  }, []);

  const retrieveBookings = async () => {
    const result = await listBooking()

    for (const element of result) {
      const dog = await queryDog({ id: element.dogId })

      element.dogName = dog.name
    }

    setBookingList(result)
  };

  const handleSnackbarClose = () => {
    setAlert({})
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = () => {
    //todo row click?
    console.log("sss")
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookingList.length) : 0;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* <Container sx={{ py: 2 }} maxWidth="lg">
          <Box component="form" noValidate onSubmit={handleSearchSubmit} sx={{ mt: 2 }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <TextField id="name" name="name" label="Name" type="search" />
              <TextField id="breed" name="breed" label="Breed" type="search" />
              <TextField
                id="birth"
                label="Birth"
                name="birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl>
                <FormLabel id="genderLabel">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="genderLabel"
                  name="gender"
                >
                  <FormControlLabel value="f" control={<Radio />} label="Female" />
                  <FormControlLabel value="m" control={<Radio />} label="Male" />
                  <FormControlLabel value='' control={<Radio />} label="N/A" />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Search
              </Button>
            </Stack>
          </Box>
        </Container> */}

        <Container sx={{ py: 2 }} maxWidth="lg">
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size='medium'
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={bookingList.length}
                  />
                  <TableBody>
                    {bookingList.slice().sort(getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.name)}
                            tabIndex={-1}
                            key={row._id}
                          >
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.dogName}</TableCell>
                            <TableCell>{row.contact}</TableCell>
                            <TableCell>{row.remark}</TableCell>
                            <TableCell>{dateToString(row.submitTimestamp)}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={bookingList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
          <Snackbar
            open={alert.show}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <MuiAlert severity="success" sx={{ width: '100%' }}>
              {alert.message}
            </MuiAlert>
          </Snackbar>
        </Container>
      </main>
    </ThemeProvider >
  );
}