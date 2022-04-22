import { useEffect } from 'react';
import shave from 'shave';

import './ConversationListItem.css';

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

  const { message } = props.data;
  const { _id, name, photo } = props.data.dog

  return (
    <div className="conversation-list-item" onClick={() => props.handleConversationClick({ messageId: props.data._id, dog: props.data.dog })}>
      <img
        className="conversation-photo"
        src={
          photo ?
            `data:image/jpeg;base64, ${photo}`
            :
            "/image/default.jpg"
        }
        alt="conversation"
      />
      <div className="conversation-info">
        <b className="conversation-title">{name} </b>
        <span className="conversation-snippet">({_id})</span>
        <p className="conversation-snippet">{message}</p>
      </div>
    </div>
  );
}