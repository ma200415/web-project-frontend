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
import FormLabel from '@mui/material/FormLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';

import { minMaxDateFormat, hkIsland, kowloon, newTerritories } from '../../helpers/utils'

const theme = createTheme();

export default function InputDog(props) {
    const [errorMessage, setErrorMessage] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        switch (props.mode) {
            case "Edit":
                data.append("name", props.dog.name);
                data.append("dogId", props.dog._id);
                data.append("photo", props.dog.photo);
                break;
            default:
                break;
        }

        const result = await props.handleSubmit(data)

        if (result.success) {
            navigate('/dog/list');
        } else {
            setErrorMessage(result)
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
                    <Typography component="h1" variant="h5">
                        {props.mode}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl required fullWidth>
                                    <InputLabel htmlFor="location">Location</InputLabel>
                                    <Select
                                        id="location"
                                        label="location"
                                        name="location"
                                        defaultValue={props.dog && props.dog.location}
                                    >
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
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        id="name"
                                        label="Name"
                                        name="name"
                                        error={errorMessage.errorType === "name"}
                                        helperText={errorMessage.errorType === "name" && errorMessage.message}
                                        InputProps={{
                                            readOnly: props.mode === "Edit",
                                        }}
                                        defaultValue={props.dog && props.dog.name}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="breed"
                                        label="Breed"
                                        name="breed"
                                        error={errorMessage.errorType === "breed"}
                                        helperText={errorMessage.errorType === "breed" && errorMessage.message}
                                        defaultValue={props.dog && props.dog.breed}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="birth"
                                        label="Birth"
                                        name="birth"
                                        type="date"
                                        defaultValue={props.dog && props.dog.birth}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{ inputProps: { max: minMaxDateFormat(new Date()) } }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <FormLabel id="genderLabel">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="genderLabel"
                                        id="gender"
                                        name="gender"
                                        defaultValue={props.dog && props.dog.gender}
                                    >
                                        <FormControlLabel value="f" control={<Radio />} label="Female" />
                                        <FormControlLabel value="m" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <input id="photo" type="file" name="photo" />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl fullWidth>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                        </FormControl>

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