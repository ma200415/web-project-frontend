import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import './Compose.css';

import { appendMessage } from '../../../helpers/WebAPI';

export default function Compose(props) {
  const handleSend = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const message = {
        messageId: props.message.messageId,
        message: data.get("message")
      }

      const result = await appendMessage(message)
      console.log(result)
    } catch (error) {
      // setErrorMessage({ errorType: "error", message: String(error) })
    }
  };

  return (
    <Box component="form" onSubmit={handleSend}>
      <div className="compose">
        <TextField
          required
          multiline
          id="message"
          name="message"
          variant="outlined"
          size='small'
          placeholder='Type a message...'
          maxRows={4}
          fullWidth
        />
        <IconButton
          color="primary"
          type='submit'
        >
          <SendIcon />
        </IconButton>
      </div>
    </Box>
  );
}