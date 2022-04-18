import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useNavigate, useLocation } from 'react-router-dom';

import { AuthContext } from "../../authContext"
import { getUserName, getDogAge, getGender, minMaxDateFormat } from '../../helpers/utils'
import { newBooking } from '../../helpers/WebAPI'

const theme = createTheme();

export default function BookDog(props) {
    const [errorMessage, setErrorMessage] = useState({});
    const { user } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const inputs = ["contact", "date", "remark"]

        const booking = {
            dogId: location.state._id,
            userId: user._id,
            submitBy: user._id,
            submitTimestamp: new Date()
        }

        inputs.forEach(element => {
            booking[element] = data.get(element)
        });

        const result = await newBooking(booking)

        if (result.success) {
            navigate('/booking/list', { success: true });
        } else {
            setErrorMessage(result)
        }
    };

    const handleSnackbarClose = () => {
        setErrorMessage({})
    };

    const dogInfo = [
        { name: "ID", value: location.state._id },
        { name: "Location", value: location.state.location },
        { name: "Name", value: location.state.name },
        { name: "Gender", value: getGender(location.state.gender) },
        { name: "Breed", value: location.state.breed },
        { name: "Birth", value: location.state.birth && (location.state.birth + " (" + getDogAge(location.state.birth) + ")") },
    ]

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
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
                        Booking
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell colSpan={2}>Interested Dog</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dogInfo.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell width={"100px"}>{row.name}:</TableCell>
                                                    <TableCell>{row.value}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    defaultValue={user && getUserName(user.firstName, user.lastName)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="contact"
                                    label="Contact"
                                    name="contact"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="date"
                                    label="Date"
                                    name="date"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{ inputProps: { min: minMaxDateFormat(new Date()) } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="remark"
                                    label="Remark"
                                    name="remark"
                                    rows={4}
                                />
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