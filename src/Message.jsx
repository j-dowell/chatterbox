import React, {Component} from 'react';

class Message extends Component {
  
  render() {
    let colorStyle= {
      color: this.props.message.color
    }
    let regex = new RegExp(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/)
    let url = this.props.message.content.match(regex);
    return (
      <div>
        <div className="message">
          <span style={colorStyle}className="message-username">{ this.props.message.username }</span>
          <span className="message-content">{ this.props.message.content }
          {url && <img className='message-img' src={url[0]}/>}
          </span>
        </div>
      </div>
    )
  }
}

export default Message;