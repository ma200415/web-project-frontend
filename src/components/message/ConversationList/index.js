import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';

import './ConversationList.css';

export default function ConversationList(props) {
  return (
    <div className="conversation-list">
      <Toolbar title="Messenger" />
      <ConversationSearch />
      {
        props.conversations && props.conversations.map(conversation =>
          <ConversationListItem
            key={conversation._id}
            data={conversation}
            getConversation={props.getConversation}
          />
        )
      }
    </div>
  );
}