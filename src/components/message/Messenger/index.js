import { useState, useEffect } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';

import { listMessage, queryDog, queryUser, queryMessage } from "../../../helpers/WebAPI"

export default function Messenger() {
  const [conversation, setConversation] = useState();
  const [conversations, setConversations] = useState();

  useEffect(() => {
    getConversations()
  }, []);

  const getConversations = async () => {
    const messages = await listMessage()

    for (const message of messages) {
      await appendUserAndDog(message)
    }

    setConversations(messages)
  }

  const getConversation = async (prop = {}) => {
    const message = await queryMessage({ id: prop.conversation._id })

    await appendUserAndDog(message)

    setConversation(message)
  }

  const appendUserAndDog = async (message) => {
    const dog = await queryDog({ id: message.dogId })
    message["dog"] = dog

    const user = await queryUser({ id: message.userId })
    message["user"] = user
  }

  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList getConversation={getConversation} conversations={conversations} />
      </div>

      <div className="scrollable content">
        {
          conversation && <MessageList conversation={conversation} getConversation={getConversation} />
        }
      </div>
    </div>
  );
}