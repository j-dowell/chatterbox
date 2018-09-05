import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  // On component mount/update, scroll to bottom of page
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    
    // Styling for username color
    let colorStyle= {
      color: this.props.message.color
    }

    // Checking for image link in user's message 
    let regex = new RegExp(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/)
    let url = this.props.message.content.match(regex);

    return (
      <div>
        <div className="message">
          <span style={ colorStyle }className="message-username">{ this.props.message.username }</span>
          <span className="message-content">{ url ?  <img className='message-img' src={ url[0] } /> : this.props.message.content }
         </span>
         {/* Dummy div to scroll down to */}
         <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
        </div>
      </div>
    )
  }
}

export default Message;