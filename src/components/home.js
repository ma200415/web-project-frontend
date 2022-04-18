import { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';

import { Link as RouterLink } from 'react-router-dom';

import { AuthContext } from "../authContext"
import { getUserName } from '../helpers/utils'

const theme = createTheme();

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card>
            <CardHeader
              title={"Welcome to The Canine Shelter" +
                (user ? ", " + getUserName(user.firstName, user.lastName) + "!" : "")}
            />
            <CardMedia
              component="img"
              image="/image/shelter.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Save the dogs
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We provide matching shelter dogs
                with new owners and arranging visits to shelter locations to meet the dogs.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You can easily browse, search and filter the dogs, let's give the dogs a real home!
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to="/dog/list">
                Let's explore
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  )
}