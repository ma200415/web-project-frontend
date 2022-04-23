import ConversationListItem from '../ConversationListItem';

import './ConversationList.css';

export default function ConversationList(props) {
  return (
    <div className="conversation-list">
      {
        props.conversations &&
        props.conversations.map(conversation =>
          <ConversationListItem
            key={conversation._id}
            conversation={conversation}
            getConversation={props.getConversation}
          />
        )
      }
    </div>
  );
}