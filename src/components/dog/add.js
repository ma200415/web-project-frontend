import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { addDog } from '../../helpers/WebAPI'

const theme = createTheme();

export default function AddDog() {
    const [errorMessage, setErrorMessage] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const result = await addDog(data)
        console.log(result)
        // if (result.success) {
        //   // setUser(); //todo don't store password
        // } else {
        //   setErrorMessage(result)
        // }
    };

    return (
        <FormControl>
            <ThemeProvider theme={theme}>
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
                        <Typography component="h1" variant="h5">
                            Add Dog
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="breed"
                                        label="Breed"
                                        name="breed"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="age"
                                        label="Age"
                                        type="number"
                                        name="age"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormLabel id="genderLabel">Gender</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="genderLabel"
                                        id="gender"
                                        name="gender"
                                    >
                                        <FormControlLabel value="f" control={<Radio />} label="Female" />
                                        <FormControlLabel value="m" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <input id="photo" type="file" name="photo" />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </FormControl>
    );
}