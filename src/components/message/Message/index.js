import { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import './Message.css';

import { AuthContext } from "../../../authContext"
import { queryUser } from "../../../helpers/WebAPI"
import { getUserName } from "../../../helpers/utils"

export default function Message(props) {
  const { user } = useContext(AuthContext);
  const [authorName, setAuthorName] = useState();

  const {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp
  } = props;

  useEffect(() => {
    async function fetchUserName() {
      const result = await queryUser({ id: data.author })

      if (result) {
        setAuthorName(getUserName(result.firstName, result.lastName))
      }
    }

    if (user.role !== "employee" && !isMine) {
      fetchUserName()
    }
  }, []);

  const friendlyTimestamp = moment(data.timestamp).format('LLLL');
  return (
    <div className={[
      'message',
      `${isMine ? 'mine' : ''}`,
      `${startsSequence ? 'start' : ''}`,
      `${endsSequence ? 'end' : ''}`
    ].join(' ')}>
      {
        showTimestamp &&
        <div className="timestamp">
          {friendlyTimestamp}
        </div>
      }

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {
            authorName &&
            <div>
              {authorName} (Staff)
              <hr />
            </div>
          }
          {data.message}
        </div>
      </div>
    </div>
  );
}