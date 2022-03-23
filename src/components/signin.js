import * as React from 'react';
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

import { Link as RouterLink, Navigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { signin } from '../helpers/WebAPI'

const theme = createTheme();

export default function SignIn() {
  const [loginResult, setLoginResult] = React.useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const signInUser = {
      email: data.get('email'),
      password: data.get('password')
    };

    if (!signInUser.email) {
      setLoginResult({ errorType: "email", message: "Required*" })

      return;
    } else if (!signInUser.password) {
      setLoginResult({ errorType: "password", message: "Required*" })

      return;
    }

    try {
      const result = await signin(signInUser) //todo handle security      

      setLoginResult(result);
    } catch (error) {
      setLoginResult({ errorType: "error", message: String(error) })
    }
  };

  const handleSnackbarClose = () => {
    setLoginResult({})
  };

  return (
    <ThemeProvider theme={theme}>
      {loginResult.success && (<Navigate to="/" replace={true} />)}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={loginResult.errorType === "email"}
              helperText={loginResult.errorType === "email" && loginResult.message}
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
              error={loginResult.errorType === "password"}
              helperText={loginResult.errorType === "password" && loginResult.message}
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
        open={loginResult.errorType === "error" || loginResult.success}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert severity={loginResult.errorType === "error" ? "error" : "success"} sx={{ width: '100%' }}>
          {loginResult.message}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}