import { useState, useEffect } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';

export default function Messenger(props) {
  const [conversation, setConversation] = useState();

  const handleConversationClick = (data) => {
    setConversation(data)
  }

  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList handleConversationClick={handleConversationClick} />
      </div>

      <div className="scrollable content">
        {
          conversation && <MessageList conversation={conversation} />
        }
      </div>
    </div>
  );
}