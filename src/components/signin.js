import { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { signin } from '../helpers/WebAPI'
import { setAuthToken } from '../helpers/utils'
import { AuthContext } from "../authContext"
import { getDecodedAuthToken } from '../helpers/WebAPI'

const theme = createTheme();

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState({});
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const signInUser = {
      email: data.get('email'),
      password: data.get('password')
    };

    try {
      const result = await signin(signInUser)

      if (!result) {
        setErrorMessage({ errorType: "error", message: "Network error" });
        return;
      }

      if (result.success && result.authToken) {
        setAuthToken(result.authToken)

        getDecodedAuthToken().then((result) => { //set JWT payload
          if (result.success) {
            setUser(result.payload);
          }
        });

        navigate('/');
      } else {
        setErrorMessage(result);
      }
    } catch (error) {
      setErrorMessage({ errorType: "error", message: String(error) })
    }
  };

  const handleSnackbarClose = () => {
    setErrorMessage({})
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              error={errorMessage.errorType === "email"}
              helperText={errorMessage.errorType === "email" && errorMessage.message}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={errorMessage.errorType === "password"}
              helperText={errorMessage.errorType === "password" && errorMessage.message}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={errorMessage.errorType}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert severity="error" sx={{ width: '100%' }}>
          {errorMessage.message}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}