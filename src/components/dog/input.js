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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function InputDog(props) {
    const [errorMessage, setErrorMessage] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        switch (props.mode) {
            case "Add":
                if (data.get("name").trim() === "") {
                    setErrorMessage({ errorType: "name", message: "Required*" })
                    return
                } else if (data.get("breed").trim() === "") {
                    setErrorMessage({ errorType: "breed", message: "Required*" })
                    return
                }
                break;
            case "Edit":
                data.append("name", props.dog.name);
                data.append("dogId", props.dog._id);
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
                            {props.mode}
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
                                        error={errorMessage.errorType === "name"}
                                        helperText={errorMessage.errorType === "name" && errorMessage.message}
                                        disabled={props.mode === "Edit"}
                                        defaultValue={props.dog && props.dog.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="breed"
                                        label="Breed"
                                        name="breed"
                                        error={errorMessage.errorType === "breed"}
                                        helperText={errorMessage.errorType === "breed" && errorMessage.message}
                                        defaultValue={props.dog && props.dog.breed}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="birth"
                                        label="Birth"
                                        name="birth"
                                        type="date"
                                        defaultValue={props.dog && props.dog.birth}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                <Snackbar
                    open={errorMessage.errorType === "error"}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                >
                    <MuiAlert severity="error" sx={{ width: '100%' }}>
                        {errorMessage.message}
                    </MuiAlert>
                </Snackbar>
            </ThemeProvider>
        </FormControl>
    );
}