import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import './Compose.css';

import { appendMessage } from '../../../helpers/WebAPI';

export default function Compose(props) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage("")
  }, [props.conversation]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        messageId: props.conversation.messageId,
        message: message
      }

      const result = await appendMessage(payload)

      if (result.success) {
        setMessage("")

        props.getConversation(props.conversation)
      } else {
        // setErrorMessage({ errorType: "error", message: String(error) })
      }
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
          value={message}
          onChange={handleMessageChange}
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