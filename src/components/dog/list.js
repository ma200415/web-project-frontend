import { useState, useEffect, useContext } from 'react';
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
import Paper from '@mui/material/Paper';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  listDog,
  deleteDog,
  queryUser,
  bookedDog,
  bookmarkDog,
  unbookmarkDog,
  sendMessage,
  listMessage
} from '../../helpers/WebAPI'

import {
  getDogAge,
  getGender,
  dateToString,
  getUserName,
  hkIsland,
  kowloon,
  newTerritories
} from '../../helpers/utils'

import { AuthContext } from "../../authContext"

import FormDialog from '../formdialog';

const theme = createTheme();

const dogTD = {
  textAlign: 'left'
};

export default function ListDog(props) {
  const [dogList, setDogList] = useState([]);
  const [alert, setAlert] = useState({});
  const [dialog, setDialog] = useState(null);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate()

  useEffect(() => {
    retrieveDogs();
  }, []);

  const isAllowAdd = () => {
    return (user && user.role === "employee" ? true : false)
  };

  const retrieveDogs = async (dog) => {
    const currentUser = user ? await queryUser({ id: user._id }) : {}

    const dogs = await listDog(dog)

    const removes = []

    for (const dog of dogs) {
      if (currentUser.bookmarks) {
        const bookmarked = currentUser.bookmarks.filter(bookmarkDog => bookmarkDog === dog._id).length > 0

        if (props.mode === "mylist" && !bookmarked) {
          removes.push(dog._id)
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

    for (const id of removes) {
      dogs.splice(dogs.findIndex(d => d._id === id), 1);
    }

    setDogList(dogs)
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dog = {
      _id: data.get('id'),
      breed: data.get('breed'),
      birthday: data.get('birthday'),
      gender: data.get('gender'),
      location: data.get("location")
    };

    retrieveDogs(dog)
  };

  const handleDeleteDog = async (dog) => {
    if (window.confirm("Are you sure to delete?")) {
      const result = await deleteDog(dog._id)

      setAlert({ show: true, type: (result.success ? "success" : "error"), message: (result.success ? "Deleted" : result.message) })

      retrieveDogs()
    }
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

  const handleMessage = async (dog) => {
    const message = await listMessage()

    const messageHistory = message.filter(m => m.dogId === dog._id)

    if (messageHistory && messageHistory.length > 0) {
      navigate("/messager")
    } else {
      setDialog({
        title: "Leave us a message",
        content: "Let us know what you are interested in",
        dog: dog
      })
    }
  };

  const handleDialogClose = () => {
    setDialog(null);
  };

  const handleDialogSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const message = {
        message: data.get("message"),
        dogId: dialog.dog._id,
        userId: user._id
      }

      const result = await sendMessage(message)
      console.log(result)
      //todo after action
      // if (!result) {
      //   setErrorMessage({ errorType: "error", message: "Network error" });
      //   return;
      // }

      // if (result.success && result.authToken) {
      //   setAuthToken(result.authToken)

      //   getDecodedAuthToken().then((result) => { //set JWT payload
      //     if (result.success) {
      //       setUser(result.payload);
      //     }
      //   });

      //   navigate('/');
      // } else {
      //   setErrorMessage(result);
      // }
    } catch (error) {
      // setErrorMessage({ errorType: "error", message: String(error) })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 1 }} >
          <Paper elevation={1} sx={{ p: 1 }}>
            <Box component="form" noValidate onSubmit={handleSearch} >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
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
                <FormControl sx={{ minWidth: "120px" }} >
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
                <Box>
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
                </Box>
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                    startIcon={<SearchIcon />}
                  >
                    Search
                  </Button>
                </Box>
                {isAllowAdd() && props.mode !== "mylist" &&
                  <Box>
                    <Button
                      color="success"
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                      component={RouterLink}
                      to="/dog/add"
                      startIcon={<AddIcon />}
                    >
                      Add
                    </Button>
                  </Box>
                }
              </Stack>
            </Box>
          </Paper>
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
                    height="300"
                  />
                  <CardContent sx={{ flexGrow: 1, overflow: "auto" }}>
                    <table cellPadding={0} style={{ width: "90%", marginLeft: 'auto', marginRight: 'auto' }} >
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
                          dog.birthday &&
                          <tr>
                            <td style={dogTD}>
                              <Typography>Birthday:</Typography>
                            </td>
                            <td style={dogTD}>
                              <Typography>{dog.birthday} ({getDogAge(dog.birthday)})</Typography>
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
                        {
                          (user && user.role === "employee") &&
                          <>
                            <tr>
                              <td style={dogTD}>
                                <Typography>Created:</Typography>
                              </td>
                              <td style={dogTD}>
                                <Typography>{dog.addByName}</Typography>
                              </td>
                            </tr><tr>
                              <td>
                              </td>
                              <td style={dogTD}>
                                <Typography variant="subtitle2">
                                  {dateToString(dog.addTimestamp)}
                                </Typography>
                              </td>
                            </tr>
                          </>
                        }
                        {
                          (user && user.role === "employee") &&
                          (
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
                          )
                        }
                      </tbody>
                    </table>
                  </CardContent>
                  <CardActions>
                    {
                      dog.booked ?
                        <Button
                          disableRipple
                          size="small"
                          color="secondary"
                          startIcon={<BlockIcon />}
                        >
                          Reserved
                        </Button>
                        :
                        <Button
                          size="small"
                          component={RouterLink}
                          to={user ? "/booking/book" : "/signin"}
                          state={user && dog}
                          color="success"
                          variant="contained"
                          startIcon={<PendingActionsIcon />}
                        >
                          Book
                        </Button>
                    }
                    {
                      user && user.role === "employee" &&
                      <>
                        <Button size="small" component={RouterLink} to="/dog/edit" state={dog} startIcon={<EditIcon />}>
                          Edit
                        </Button>
                        <Button size="small" onClick={() => handleDeleteDog(dog)} startIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                      </>
                    }
                    <Box sx={{ marginLeft: "auto" }}>
                      {
                        user && user.role !== "employee" &&
                        <IconButton
                          onClick={() => { handleMessage(dog) }}
                        >
                          <QuestionAnswerIcon color="primary" />
                        </IconButton>
                      }
                      {
                        user &&
                        <IconButton
                          onClick={() => {
                            dog.bookmark ? handleUndoBookmarkDog(dog) : handleBookmarkDog(dog)
                          }}
                        >
                          {dog.bookmark ?
                            <BookmarkAddedIcon color="success" />
                            :
                            <BookmarkAddIcon color="primary" />
                          }
                        </IconButton>
                      }
                    </Box>
                  </CardActions>
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
          <FormDialog dialog={dialog} handleDialogClose={handleDialogClose} handleDialogSubmit={handleDialogSubmit} />
        </Container>
      </main>
    </ThemeProvider>
  );
}