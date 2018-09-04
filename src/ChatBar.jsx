import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="chatbar">
        <input defaultValue={this.props.currentUser.name}className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;