import { useEffect, useState, useContext } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import Message from '../Message';
import moment from 'moment';

import './MessageList.css';

import { AuthContext } from "../../../authContext"
import { getUserName } from "../../../helpers/utils"

export default function MessageList(props) {
  const [messages, setMessages] = useState([])
  const { user } = useContext(AuthContext);

  const { conversation } = props.conversation

  useEffect(() => {
    const initMessage = [{
      author: conversation.userId,
      message: conversation.message,
      timestamp: new Date(conversation.createTimestamp).getTime()
    }]

    if (conversation.replys) {
      conversation.replys.forEach(reply => {
        initMessage.push({
          author: reply.userId,
          message: reply.message,
          timestamp: new Date(reply.createTimestamp).getTime()
        })
      });
    }

    initMessage["dog"] = conversation.dog
    initMessage["user"] = conversation.user

    setMessages(initMessage)
  }, [props.conversation])

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === user._id;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  return (
    <div className="message-list">
      <Toolbar
        upperTitle={getUserName(conversation.user.firstName, conversation.user.lastName)}
        title={conversation.dog.name + " (" + conversation.dog._id + ")"}
      />

      <div className="message-list-container">{renderMessages()}</div>

      <Compose conversation={props.conversation} getConversation={props.getConversation} />
    </div>
  );
}