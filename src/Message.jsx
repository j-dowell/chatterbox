import React, {Component} from 'react';

class Message extends Component {
  
  render() {
    let colorStyle= {
      color: this.props.message.color
    }
    return (
      <div>
        <div className="message">
          <span style={colorStyle}className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      </div>
    )
  }
}

export default Message;