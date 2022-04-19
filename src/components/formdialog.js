import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

export default function FormDialog(props) {
    return (
        <div>
            <Dialog
                fullWidth
                open={props.dialog ? true : false}
                onClose={props.handleDialogClose}
            >
                <DialogTitle>
                    {props.dialog && props.dialog.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: 15 }}>
                        {props.dialog && props.dialog.content}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        fullWidth
                        id="message"
                        name="message"
                        label="Message"
                        multiline
                        rows={4}
                        sx={{ marginTop: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleDialogClose}>
                        Cancel
                    </Button>
                    <Button
                        endIcon={<SendIcon />}
                        variant="contained"
                        color="success"
                        onClick={props.handleDialogSend}
                    >
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}