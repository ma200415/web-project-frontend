import { useContext, useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import moment from 'moment';
import './Message.css';

import { AuthContext } from "../../../authContext"
import { queryUser, deleteMessage } from "../../../helpers/WebAPI"
import { getUserName } from "../../../helpers/utils"

export default function Message(props) {
  const { user } = useContext(AuthContext);
  const [authorName, setAuthorName] = useState();

  const {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp,
    messageId,
    index
  } = props;

  useEffect(() => {
    async function fetchUserName() {
      const result = await queryUser({ id: data.author })

      if (result) {
        setAuthorName(getUserName(result.firstName, result.lastName))
      }
    }

    if (user.role !== "employee" && !isMine) {
      fetchUserName()
    }
  }, []);

  const handleDeleteMessage = async (data) => {
    try {
      const payload = {
        messageId: messageId,
        message: data.message,
        userId: data.author,
        createTimestamp: data.timestamp,
        index: index
      }

      const result = await deleteMessage(payload)

      props.getConversation({ conversation: { _id: messageId } })
    } catch (error) {
      console.error(error)
    }
  }

  const friendlyTimestamp = moment(data.timestamp).format('LLLL');
  return (
    <div className={[
      'message',
      `${isMine ? 'mine' : ''}`,
      `${startsSequence ? 'start' : ''}`,
      `${endsSequence ? 'end' : ''}`
    ].join(' ')}>
      {
        showTimestamp &&
        <div className="timestamp">
          {friendlyTimestamp}
        </div>
      }

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {
            authorName &&
            <div>
              {authorName} (Staff)
              <hr />
            </div>
          }
          {
            user.role === "employee" &&
            <IconButton disableRipple sx={{ padding: "0" }} size="small" onClick={() => handleDeleteMessage(data)}>
              <ClearIcon fontSize="inherit" />
            </IconButton>
          }

          {data.message}
        </div>
      </div>
    </div>
  );
}