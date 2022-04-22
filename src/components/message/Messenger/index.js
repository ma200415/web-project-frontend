import { useState, useEffect } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';

import { listMessage, queryDog, queryMessage } from "../../../helpers/WebAPI"

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
    }

    setConversations(messages)
  }

  const getConversation = async (data = {}) => {
    const message = await queryMessage(data.messageId)

    const initMessage = [{
      author: message.userId,
      message: message.message,
      timestamp: new Date(message.createTimestamp).getTime()
    }]

    if (message.replys) {
      message.replys.forEach(reply => {
        initMessage.push({
          author: reply.userId,
          message: reply.message,
          timestamp: new Date(reply.createTimestamp).getTime()
        })
      });
    }

    initMessage["messageId"] = data.messageId
    initMessage["dog"] = data.dog

    setConversation(initMessage)
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