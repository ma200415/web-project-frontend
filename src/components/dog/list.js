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
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { listDog } from '../../helpers/WebAPI'

const theme = createTheme();

export default function ListDog() {
  const [dogList, setDogList] = useState([]);

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = async () => {
    // TutorialDataService.getAll()
    //   .then(response => {
    //     setTutorials(response.data);
    //     console.log(response.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });

    const sss = await listDog()
    setDogList(sss)
    console.log(dogList)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dog = {
      name: data.get('name'),
      breed: data.get('breed'),
      age: data.get('age'),
      gender: data.get('gender')
    };

    const result = await listDog(dog)
    console.log(result)
    setDogList(result)
    // if (result.success) {
    //   // setUser(); //todo don't store password
    // } else {
    //   setErrorMessage(result)
    // }
  };

  const cards = [1, 2]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            Submit
          </Button>
        </Box>

        <Container sx={{ py: 2 }} maxWidth="md">
          <Grid container spacing={4}>
            {dogList.map((dog) => (
              <Grid item key={dog._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    // sx={{
                    //   // 16:9
                    //   pt: '56.25%',
                    // }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {dog.name}
                    </Typography>
                    <Typography>
                      {(dog.gender === 'm' ? "Male" : "Female")} ({dog.age})
                    </Typography>
                    <Typography>
                      Breed:  {dog.breed}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Edit</Button>
                    <Button size="small">Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}