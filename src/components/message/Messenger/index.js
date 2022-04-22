import { useState, useEffect } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';

import { listMessage, queryDog, queryUser } from "../../../helpers/WebAPI"

export default function Messenger() {
  const [conversation, setConversation] = useState();
  const [conversations, setConversations] = useState();

  useEffect(() => {
    getConversations()
  }, []);

  const getConversations = async () => {
    const messages = await listMessage()

    for (const element of messages) {
      const dog = await queryDog({ id: element.dogId })
      element["dog"] = dog

      const user = await queryUser({ id: element.userId })
      element["user"] = user
    }

    setConversations(messages)
  }

  const getConversation = async (prop = {}) => {
    setConversation(prop)
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