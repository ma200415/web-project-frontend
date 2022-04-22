import { useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import shave from 'shave';

import './ConversationListItem.css';

import { AuthContext } from "../../../authContext"
import { stringAvatar, getUserName } from "../../../helpers/utils"

export default function ConversationListItem(props) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

  const { message } = props.conversation;
  const { _id, name, photo } = props.conversation.dog
  const { firstName, lastName } = props.conversation.user

  return (
    <div className="conversation-list-item" onClick={() => props.getConversation(props)}>
      {
        user.role === "employee" ?
          <Avatar
            className="conversation-photo"
            {...user && stringAvatar(getUserName(firstName, lastName))}
          />
          :
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
      }

      <div className="conversation-info">
        {user.role === "employee" &&
          <div className="conversation-title">
            {getUserName(firstName, lastName)}
          </div>
        }
        <b className="conversation-title">{name} </b>
        <span className="conversation-snippet">({_id})</span>
        <p className="conversation-snippet">{message}</p>
      </div>
    </div>
  );
}