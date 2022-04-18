import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import Select from '@mui/material/Select';

import { listDog, deleteDog, queryUser, bookedDog, bookmarkDog, unbookmarkDog } from '../../helpers/WebAPI'
import { getDogAge, getGender, dateToString, getUserName, hkIsland, kowloon, newTerritories } from '../../helpers/utils'

import { Link as RouterLink } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from "../../authContext"

const theme = createTheme();

const dogTD = {
  textAlign: 'left'
};

export default function ListDog(props) {
  const [dogList, setDogList] = useState([]);
  const [alert, setAlert] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    retrieveDogs();
  }, []);

  const isAllowAdd = () => {
    return (user && user.role === "employee" ? true : false)
  };

  const retrieveDogs = async (dog) => {
    const currentUser = user ? await queryUser({ id: user._id }) : {}

    const dogs = await listDog(dog)

    for (const dog of dogs) {
      if (currentUser.bookmarks) {
        const bookmarked = currentUser.bookmarks.filter(bookmarkDog => bookmarkDog === dog._id).length > 0

        if (props.mode === "mylist" && !bookmarked) {
          dogs.splice(dogs.findIndex(d => d._id === dog._id), 1); //remove dog from dogs if not in bookmark
          continue
        }

        dog.bookmark = bookmarked
      }

      const addByUser = await queryUser({ id: dog.addBy })
      dog.addByName = getUserName(addByUser.firstName, addByUser.lastName)

      if (dog.editBy) {
        const editByUser = await queryUser({ id: dog.editBy })
        dog.editByName = getUserName(editByUser.firstName, editByUser.lastName)
      }

      const bookedDogs = await bookedDog({ dogId: dog._id })
      dog.booked = bookedDogs.length > 0
    }

    setDogList(dogs)
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dog = {
      name: data.get('name'),
      breed: data.get('breed'),
      birth: data.get('birth'),
      gender: data.get('gender'),
      location: data.get("location")
    };

    retrieveDogs(dog)
  };

  const handleDeleteDog = async (dog) => {
    const result = await deleteDog(dog._id)

    setAlert({ show: true, type: (result.success ? "success" : "error"), message: (result.success ? "Deleted" : result.message) })

    retrieveDogs()
  }

  const handleBookmarkDog = async (dog) => {
    const result = await bookmarkDog(dog._id)

    setAlert({ show: true, type: (result.success ? "success" : "error"), message: (result.success ? "Bookmarked" : result.message) })

    retrieveDogs()
  }

  const handleUndoBookmarkDog = async (dog) => {
    const result = await unbookmarkDog(dog._id)

    setAlert({ show: true, type: (result.success ? "success" : "error"), message: (result.success ? "Unbookmarked" : result.message) })

    retrieveDogs()
  }

  const handleSnackbarClose = () => {
    setAlert({})
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 2 }} maxWidth="lg">
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
                InputProps={{ inputProps: { max: minMaxDateFormat(new Date()) } }}
              />
              <FormControl>
                <TextField id="id" name="id" label="ID" type="search"
                  inputProps={{
                    maxLength: 24,
                    size: 24
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField id="breed" name="breed" label="Breed" type="search" />
              </FormControl>
              <FormControl sx={{ minWidth: "200px" }} >
                <InputLabel htmlFor="location">Location</InputLabel>
                <Select
                  id="location"
                  label="location"
                  name="location"
                >
                  <MenuItem value="">
                    None
                  </MenuItem>
                  <ListSubheader>
                    {hkIsland.district}
                  </ListSubheader>
                  {
                    hkIsland.centres.map((centre) =>
                      <MenuItem value={centre}>
                        {centre}
                      </MenuItem>
                    )
                  }

                  <ListSubheader>
                    {kowloon.district}
                  </ListSubheader>
                  {
                    kowloon.centres.map((centre) =>
                      <MenuItem value={centre}>
                        {centre}
                      </MenuItem>
                    )
                  }

                  <ListSubheader>
                    {newTerritories.district}
                  </ListSubheader>
                  {
                    newTerritories.centres.map((centre) =>
                      <MenuItem value={centre}>
                        {centre}
                      </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel id="genderLabel">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="genderLabel"
                  name="gender"
                >
                  <FormControlLabel value="f" control={<Radio />} label="Female" />
                  <FormControlLabel value="m" control={<Radio />} label="Male" />
                  <FormControlLabel value='' control={<Radio />} label="All" />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
              {isAllowAdd() &&
                <Button
                  color="success"
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  component={RouterLink} to="/dog/add"
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              }
            </Stack>
          </Box>
        </Container>

        <Container sx={{ py: 2 }} maxWidth="lg">
          {(dogList && dogList.length === 0) &&
            <Typography variant="h6" textAlign={'center'}>
              No records found
            </Typography>
          }
          <Grid container spacing={4}>
            {dogList.map((dog) => (
              <Grid item key={dog._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    src={
                      dog.photo ?
                        `data:image/jpeg;base64, ${dog.photo}`
                        :
                        "/image/default.jpg"
                    }
                  />
                  <CardContent spacing={4} sx={{ flexGrow: 1 }}>
                    <table cellPadding={0} style={{ width: "90%", marginLeft: 'auto', marginRight: 'auto' }}>
                      <thead>
                        <tr>
                          <td colSpan={2}>
                            <Typography gutterBottom variant="h5" component="h2" textAlign={'center'}>
                              {dog.name}
                            </Typography>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={dogTD}>
                            <Typography>ID:</Typography>
                          </td>
                          <td style={dogTD}>
                            <Typography>{dog._id}</Typography>
                          </td>
                        </tr>
                        {
                          dog.gender &&
                          <tr>
                            <td style={dogTD}>
                              <Typography>Gender:</Typography>
                            </td>
                            <td style={dogTD}>
                              <Typography>{getGender(dog.gender)}</Typography>
                            </td>
                          </tr>
                        }
                        {
                          dog.breed &&
                          <tr>
                            <td style={dogTD}>
                              <Typography>Breed:</Typography>
                            </td>
                            <td style={dogTD}>
                              <Typography>{dog.breed}</Typography>
                            </td>
                          </tr>
                        }
                        {
                          dog.birth &&
                          <tr>
                            <td style={dogTD}>
                              <Typography>Birth:</Typography>
                            </td>
                            <td style={dogTD}>
                              <Typography>{dog.birth} ({getDogAge(dog.birth)})</Typography>
                            </td>
                          </tr>
                        }
                        <tr>
                          <td style={dogTD}>
                            <Typography>Location:</Typography>
                          </td>
                          <td style={dogTD}>
                            <Typography>{dog.location}</Typography>
                          </td>
                        </tr>
                        <tr>
                          <td style={dogTD}>
                            <Typography>Created:</Typography>
                          </td>
                          <td style={dogTD}>
                            <Typography>{dog.addByName}</Typography>
                          </td>
                        </tr>
                        <tr>
                          <td>
                          </td>
                          <td style={dogTD}>
                            <Typography variant="subtitle2">
                              {dateToString(dog.addTimestamp)}
                            </Typography>
                          </td>
                        </tr>

                        {
                          dog.editByName &&
                          <>
                            <tr>
                              <td style={dogTD}>
                                <Typography>Edited:</Typography>
                              </td>
                              <td style={dogTD}>
                                <Typography>{dog.editByName}</Typography>
                              </td>
                            </tr>
                            <tr>
                              <td>
                              </td>
                              <td style={dogTD}>
                                <Typography variant="subtitle2" >
                                  {dateToString(dog.editTimestamp)}
                                </Typography>
                              </td>
                            </tr>
                          </>
                        }
                      </tbody>
                    </table>

                  </CardContent>
                  {user &&
                    <CardActions>
                      {
                        dog.booked ?
                          <Button color="secondary" startIcon={<BlockIcon />}>Reserved</Button>
                          :
                          <>
                            <Button size="small" component={RouterLink} to="/booking/book" state={dog} color="success" variant="contained" startIcon={<PendingActionsIcon />}>
                              Book
                            </Button>
                            <Button size="small" component={RouterLink} to="/dog/edit" state={dog} startIcon={<EditIcon />}>
                              Edit
                            </Button>
                            <Button size="small" onClick={() => handleDeleteDog(dog)} startIcon={<DeleteIcon />}>
                              Delete
                            </Button>
                            <IconButton onClick={() => {
                              dog.bookmark ?
                                handleUndoBookmarkDog(dog)
                                :
                                handleBookmarkDog(dog)
                            }}
                              style={{ marginLeft: "auto" }}>
                              <BookmarkAddIcon color={dog.bookmark ? "success" : "primary"} />
                            </IconButton>
                          </>
                      }
                    </CardActions>
                  }
                </Card>
              </Grid>
            ))}
          </Grid>
          <Snackbar
            open={alert.show}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <MuiAlert severity={alert.type} sx={{ width: '100%' }}>
              {alert.message}
            </MuiAlert>
          </Snackbar>
        </Container>
      </main>
    </ThemeProvider >
  );
}