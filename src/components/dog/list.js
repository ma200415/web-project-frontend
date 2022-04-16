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

import { listDog, deleteDog } from '../../helpers/WebAPI'

import { Link as RouterLink } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from "../../authContext"

const theme = createTheme();

export default function ListDog() {
  const [dogList, setDogList] = useState([]);
  const [alert, setAlert] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    retrieveDogs();
  }, []);

  const isAllowAdd = () => {
    return (user && user.admin ? true : false)
  };

  const retrieveDogs = async (dog) => {
    const result = await listDog(dog)
    setDogList(result)
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dog = {
      name: data.get('name'),
      breed: data.get('breed'),
      birth: data.get('birth'),
      gender: data.get('gender')
    };

    retrieveDogs(dog)
  };

  const handleDeleteDog = async (dog) => {
    const result = await deleteDog(dog._id)

    setAlert({ show: true, message: (result.success ? "Success" : result.message) })

    retrieveDogs()
  }

  const handleSnackbarClose = () => {
    setAlert({})
  };

  const getGender = (gender) => {
    switch (gender) {
      case "m":
        return "Male"
      case "f":
        return "Female"
      default:
        return gender
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box component="form" noValidate onSubmit={handleSearchSubmit} sx={{ mt: 2 }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <TextField id="name" name="name" label="Name" type="search" />
            <TextField id="breed" name="breed" label="Breed" type="search" />
            <TextField id="age" name="age" label="Age" type="search" />

            <FormControl>
              <FormLabel id="genderLabel">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="genderLabel"
                name="gender"
              >
                <FormControlLabel value="f" control={<Radio />} label="Female" />
                <FormControlLabel value="m" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Search
            </Button>
            {isAllowAdd() && (
              <TextField
                id="birth"
                label="Birth"
                name="birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                color="success"
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                component={RouterLink} to="/dog/add"
              >
                Add
              </Button>
            )}
          </Stack>
        </Box>

        <Container sx={{ py: 2 }} maxWidth="md">
          {dogList.length === 0 && "No records found"}

          <Grid container spacing={4}>
            {dogList.map((dog) => (
              <Grid item key={dog._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                    src={
                      dog.photo ?
                        `data:image/jpeg;base64, ${dog.photo}`
                        :
                        "/image/default.jpg"
                    }
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {dog.name}
                    </Typography>
                    <Typography>
                      {(getGender(dog.gender))} ({dog.age})
                    </Typography>
                    <Typography>
                      Breed:  {dog.breed}
                    </Typography>
                    {dog.birth && (
                      <Typography>
                        Birth: {dog.birth} ({(new Date().getFullYear() - new Date(dog.birth).getFullYear())})
                      </Typography>
                    )}
                  </CardContent>
                  {user && (
                    <CardActions>
                      <Button size="small" component={RouterLink} to="/dog/edit" state={dog}>Edit</Button>
                      <Button size="small" onClick={() => handleDeleteDog(dog)}>Delete</Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
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