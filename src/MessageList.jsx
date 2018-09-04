import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages;
    const listitems = messages.map((message) => 
       <Message key={message.id} message={message}/>
    )
    return (
      <main className="messages">
        <div>{listitems}</div>
        <Notification />
      </main>
      
    )
  }
}

export default MessageList;