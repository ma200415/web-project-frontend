import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';

import './ConversationList.css';

import { listMessage, queryDog } from "../../../helpers/WebAPI"

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getConversations()
  }, [])

  const getConversations = async () => {
    const messages = await listMessage()

    for (const element of messages) {
      const dog = await queryDog({ id: element.dogId })

      element["dog"] = dog
    }

    setConversations(messages)
  }

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
      />
      <ConversationSearch />
      {
        conversations.map(conversation =>
          <ConversationListItem
            key={conversation._id}
            data={conversation}
            handleConversationClick={props.handleConversationClick}
          />
        )
      }
    </div>
  );
}