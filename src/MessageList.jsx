import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages;
    const listitems = messages.map((message) =>  {
      if (message.type === 'incomingMessage') {
        return (
        <Message key={message.id} message={message}/>
        )
      } else if (message.type === 'incomingNotification') {
        return(
          <div className="message system">
            {message.content}
          </div>
        )
      }
    }
    )
    return (
      <main className="messages">
        <div>{listitems}</div>
      </main>
    )
  }
}

export default MessageList;